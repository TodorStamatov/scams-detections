#!/usr/bin/env python3
"""
Download PaySim CSV into ../data/paysim.csv

Tries (in order):
1) huggingface_hub (dataset: theman10/paysim)
2) kagglehub (dataset: ealaxi/paysim1)

If SSL verification fails (corporate proxy), set:
  export CURL_CA_BUNDLE=""
  or run: curl -k -L -o data/paysim.csv "https://huggingface.co/datasets/theman10/paysim/resolve/main/paysim.csv"
"""
from __future__ import annotations

import os
import shutil
import sys


def main() -> int:
    root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    data_dir = os.path.join(root, "data")
    os.makedirs(data_dir, exist_ok=True)
    dest = os.path.join(data_dir, "paysim.csv")

    # 1) Hugging Face
    try:
        from huggingface_hub import hf_hub_download

        path = hf_hub_download(
            repo_id="theman10/paysim",
            repo_type="dataset",
            filename="paysim.csv",
            local_dir=os.path.join(data_dir, "_hf_dl"),
        )
        shutil.copy2(path, dest)
        shutil.rmtree(os.path.join(data_dir, "_hf_dl"), ignore_errors=True)
        print(f"OK: wrote {dest} ({os.path.getsize(dest) / 1e6:.1f} MB)")
        return 0
    except Exception as e:  # noqa: BLE001
        print("huggingface_hub failed:", e, file=sys.stderr)

    # 2) Kaggle Hub
    try:
        import kagglehub

        folder = kagglehub.dataset_download("ealaxi/paysim1")
        for walk_root, _, files in os.walk(folder):
            for f in files:
                if f.lower().endswith(".csv"):
                    shutil.copy2(os.path.join(walk_root, f), dest)
                    print(f"OK: wrote {dest} ({os.path.getsize(dest) / 1e6:.1f} MB)")
                    return 0
    except Exception as e:  # noqa: BLE001
        print("kagglehub failed:", e, file=sys.stderr)

    print(
        "Automatic download failed. Manual options:\n"
        "  curl -k -L -o data/paysim.csv "
        '"https://huggingface.co/datasets/theman10/paysim/resolve/main/paysim.csv"\n'
        "  # or download from Kaggle: ealaxi/paysim1 and place CSV as data/paysim.csv",
        file=sys.stderr,
    )
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
