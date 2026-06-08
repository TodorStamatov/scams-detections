#!/usr/bin/env python3
"""
Build paysim_summary.json for the React dashboard (chunked CSV read).

Usage:
  python scripts/export_dashboard_data.py
  python scripts/export_dashboard_data.py --csv data/paysim.csv --out dashboard/public/data
"""
from __future__ import annotations

import argparse
import json
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
import pandas as pd


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--csv", type=Path, default=Path("data/paysim.csv"))
    p.add_argument("--out", type=Path, default=Path("dashboard/public/data"))
    p.add_argument("--chunksize", type=int, default=250_000)
    p.add_argument("--scatter-rows", type=int, default=600_000, help="Max rows read for stratified scatter sample")
    p.add_argument("--scatter-n", type=int, default=6000, help="Total points in scatter (approx, stratified)")
    p.add_argument(
        "--max-chunks",
        type=int,
        default=None,
        help="If set, stop after this many chunks (for quick tests only)",
    )
    args = p.parse_args()

    if not args.csv.exists():
        print(f"Missing CSV: {args.csv}")
        return 1

    args.out.mkdir(parents=True, exist_ok=True)

    usecols = [
        "step",
        "type",
        "amount",
        "oldbalanceOrg",
        "newbalanceOrig",
        "oldbalanceDest",
        "newbalanceDest",
        "isFraud",
        "isFlaggedFraud",
    ]

    total = 0
    fraud_total = 0
    type_count: dict[str, int] = defaultdict(int)
    type_fraud: dict[str, int] = defaultdict(int)
    flagged_cross: dict[tuple[int, int], int] = defaultdict(int)

    n_amt_bins = 40
    n_step_bins = 30
    amt_hist = np.zeros(n_amt_bins, dtype=np.int64)
    step_hist = np.zeros(n_step_bins, dtype=np.int64)

    chunk_idx = 0
    for chunk in pd.read_csv(
        args.csv,
        usecols=usecols,
        chunksize=args.chunksize,
        low_memory=False,
    ):
        chunk_idx += 1
        total += len(chunk)
        fraud_total += int(chunk["isFraud"].sum())

        for t, grp in chunk.groupby("type"):
            type_count[str(t)] += len(grp)
            type_fraud[str(t)] += int(grp["isFraud"].sum())

        for (a, b), c in (
            chunk.groupby(["isFlaggedFraud", "isFraud"]).size().items()
        ):
            flagged_cross[(int(a), int(b))] += int(c)

        la = np.log1p(chunk["amount"].astype(np.float64).clip(lower=0))
        st = chunk["step"].astype(np.float64)

        # Fixed ranges for stable binning across chunks (log1p amount, step).
        la_clip = np.clip(la, 0, 25)
        amt_hist += np.histogram(la_clip, bins=n_amt_bins, range=(0, 25))[0]

        st_clip = np.clip(st, 0, 800)
        step_hist += np.histogram(st_clip, bins=n_step_bins, range=(0, 800))[0]

        if args.max_chunks is not None and chunk_idx >= args.max_chunks:
            break

    fraud_rate = fraud_total / max(total, 1)

    by_type = []
    for t in sorted(type_count.keys()):
        c = type_count[t]
        f = type_fraud[t]
        by_type.append(
            {
                "type": t,
                "count": c,
                "fraud_count": f,
                "fraud_rate": f / max(c, 1),
            }
        )

    class_balance = [
        {"label": "0", "count": total - fraud_total},
        {"label": "1", "count": fraud_total},
    ]

    amt_edges = np.linspace(0, 25, n_amt_bins + 1)
    amount_histogram = []
    for i in range(n_amt_bins):
        amount_histogram.append(
            {
                "bin_start": float(amt_edges[i]),
                "bin_end": float(amt_edges[i + 1]),
                "count": int(amt_hist[i]),
            }
        )

    step_edges = np.linspace(0, 800, n_step_bins + 1)
    step_histogram = []
    for i in range(n_step_bins):
        step_histogram.append(
            {
                "bin_start": float(step_edges[i]),
                "bin_end": float(step_edges[i + 1]),
                "count": int(step_hist[i]),
            }
        )

    flagged_list = [
        {
            "isFlaggedFraud": int(a),
            "isFraud": int(b),
            "count": int(c),
        }
        for (a, b), c in sorted(flagged_cross.items())
    ]

    # Stratified scatter from first scatter_rows (documented bias)
    head = pd.read_csv(
        args.csv,
        nrows=args.scatter_rows,
        usecols=["step", "amount", "isFraud"],
        low_memory=False,
    )
    rng = np.random.default_rng(42)
    parts = []
    for label in (0, 1):
        g = head[head["isFraud"] == label]
        n_take = min(len(g), args.scatter_n // 2 + (args.scatter_n % 2 if label == 0 else 0))
        if n_take > 0:
            parts.append(g.sample(n=n_take, random_state=rng))
    scatter_df = pd.concat(parts, ignore_index=True)
    scatter_df = scatter_df.sample(frac=1.0, random_state=rng).reset_index(drop=True)
    sample_scatter = [
        {
            "step": int(row.step),
            "log_amount": float(np.log1p(max(row.amount, 0))),
            "isFraud": int(row.isFraud),
        }
        for row in scatter_df.itertuples(index=False)
    ]

    out = {
        "meta": {
            "total_rows": total,
            "fraud_rate": fraud_rate,
            "amount_log_clip": [0, 25],
            "step_clip": [0, 800],
            "scatter_source_rows": min(args.scatter_rows, total),
            "generated_at": datetime.now(timezone.utc).isoformat(),
        },
        "class_balance": class_balance,
        "by_type": by_type,
        "amount_histogram": amount_histogram,
        "step_histogram": step_histogram,
        "flagged_cross": flagged_list,
        "sample_scatter": sample_scatter,
    }

    dest = args.out / "paysim_summary.json"
    dest.write_text(json.dumps(out, indent=2), encoding="utf-8")
    print(f"Wrote {dest} ({dest.stat().st_size / 1024:.1f} KiB)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
