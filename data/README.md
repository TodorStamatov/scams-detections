# PaySim data

Place `paysim.csv` here (expected path: `data/paysim.csv`).

Download options:

1. **Project script (HF or Kaggle):** `python scripts/download_paysim.py`
2. **Manual (if SSL issues):**  
   `curl -k -L -o data/paysim.csv "https://huggingface.co/datasets/theman10/paysim/resolve/main/paysim.csv"`

The notebook `scams-detection.ipynb` reads this file by default.

For the React dashboard (`dashboard/`), run `python scripts/export_dashboard_data.py` to build `dashboard/public/data/paysim_summary.json` (see `dashboard/README.md`).
