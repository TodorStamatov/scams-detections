# Детекция на финансови измами (PaySim)

Mетоди за детекция на финансови измами чрез машинно обучение при небалансирани данни.

Проектът съдържа:

- **`scams-detection.ipynb`** — ML pipeline: EDA, preprocessing, корелации, PCA, крос-валидация с метрики (ROC AUC, PR AUC, F1) и стратегии за небалансирани класове (class weights, SMOTE, undersampling)
- **`dashboard/`** — React SPA за визуализация на PaySim агрегати и ML резултати
- **`scripts/`** — помощни скриптове за данни и dashboard

## Необходими библиотеки

| Компонент | Версия |
|-----------|--------|
| Python | 3.10+ (препоръчително 3.12) |
| Node.js | 20+ |
| npm | идва с Node.js |

## Структура на проекта

```
scams-detections/
├── scams-detection.ipynb      # основен notebook
├── requirements.txt           # Python dependencies 
├── data/
│   └── paysim.csv             # PaySim dataset
├── scripts/
│   ├── download_paysim.py     # изтегляне на CSV
│   └── export_dashboard_data.py
└── dashboard/                 # React + Vite приложение
    ├── public/data/           # JSON за графиките
    └── dist/                  # production build
```

## Подготовка и стартиране

Всички команди по-долу се пускат от **root директорията** на проекта.

### Стъпка 1 — Подготовка на Python среда

```bash
python3 -m venv .venv          # създава изолирана Python среда в папка .venv
source .venv/bin/activate      # активира виртуалната среда в текущия терминал
pip install -r requirements.txt
```

Проверка:

```bash
python -c "import pandas, sklearn, xgboost, lightgbm, imblearn; print('OK')"
```

### Стъпка 2 — Зареждане на данни (PaySim)

Notebook-ът и dashboard-ът очакват файл `data/paysim.csv`.

```bash
python scripts/download_paysim.py
```

Скриптът опитва Hugging Face (`theman10/paysim`), после Kaggle (`ealaxi/paysim1`).

При SSL проблеми:

```bash
curl -k -L -o data/paysim.csv \
  "https://huggingface.co/datasets/theman10/paysim/resolve/main/paysim.csv"
```

### Стъпка 3 — Данни за dashboard

```bash
source .venv/bin/activate
python scripts/export_dashboard_data.py
```

Създава `dashboard/public/data/paysim_summary.json`. За бърз тест с по-малко данни:

```bash
python scripts/export_dashboard_data.py --max-chunks 5
```

За ML графиките без notebook:

```bash
cp dashboard/public/data/ml_results.sample.json dashboard/public/data/ml_results.json
```

> Ако JSON файловете липсват, dashboard-ът автоматично ползва `*.sample.json` от `dashboard/public/data/`.

### Стъпка 4 — Dashboard

```bash
cd dashboard
npm install
npm run dev
```

Дашбордът е достъпен на URL-а от терминала (обикновено `http://localhost:5173`).

Production build:

```bash
cd dashboard
npm install
npm run build    # изход: dashboard/dist/
npm run preview  # локален преглед на build-а
```

### Стъпка 5 — Jupyter notebook

```bash
source .venv/bin/activate
jupyter notebook scams-detection.ipynb
```

- По подразбиране се ползва подизвадка от **300 000 реда** (`SAMPLE_SIZE` във втората code клетка).
- След пълно изпълнение пусни клетката от **секция 8** — записва ML резултатите в `dashboard/public/data/ml_results.json`.

### Всичко наведнъж

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python scripts/download_paysim.py
python scripts/export_dashboard_data.py
cd dashboard && npm install && npm run dev
```

## Скриптове

| Скрипт | Описание |
|--------|----------|
| `scripts/download_paysim.py` | Изтегля `data/paysim.csv` |
| `scripts/export_dashboard_data.py` | Генерира `paysim_summary.json` за dashboard |

## Често срещани проблеми

| Проблем | Решение |
|---------|---------|
| `FileNotFoundError: Missing data/paysim.csv` | `python scripts/download_paysim.py` или ръчно изтегляне (стъпка 2) |
| SSL грешка при download | `curl -k` командата от стъпка 2 или `export CURL_CA_BUNDLE=""` |
| Dashboard показва sample данни | Пускаме стъпка 3 и/или notebook секция 8 |
| Бавно обучение в notebook | Намаляме `SAMPLE_SIZE` или ползвай пълния dataset (~6.3M реда) |

## Допълнителна документация

- `data/README.md` — бележки за PaySim CSV
- `dashboard/README.md` — детайли за React dashboard
