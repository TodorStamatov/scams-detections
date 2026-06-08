# PaySim dashboard (React)

Single-page визуализация: агрегати от PaySim (`paysim_summary.json`) и ML обобщение (`ml_results.json`).

## Предпоставки

- Node.js 20+
- Python 3 с `pandas`, `numpy` (виж root `requirements.txt`)

## 1. Данни за графиките (PaySim)

От root на проекта:

```bash
python scripts/export_dashboard_data.py
# Бърз тест (част от chunks):
python scripts/export_dashboard_data.py --max-chunks 5
```

Изход: `dashboard/public/data/paysim_summary.json` (в `.gitignore`).

Ако няма CSV, приложението ползва `public/data/paysim_summary.sample.json`.

## 2. ML резултати

След пълното изпълнение на `scams-detection.ipynb` пусни клетката от **секция 8** — записва `dashboard/public/data/ml_results.json`.

За демо без notebook:

```bash
cp dashboard/public/data/ml_results.sample.json dashboard/public/data/ml_results.json
```

## 3. Старт

```bash
cd dashboard
npm install
npm run dev
```

Build: `npm run build` → статични файлове в `dist/`.

## Бележки

- `npm run dev` ползва Vite; JSON се чете от `public/data/`.
- За production deploy качете `dist/` + генерираните JSON (или само sample за демо).
