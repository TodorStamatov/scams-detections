import type { MlRow } from '../data/types'

export function rowLabel(r: MlRow) {
  return `${r.Family}: ${r.Model}`
}

export function pivotForGroupedBars(rows: MlRow[], metric: keyof MlRow) {
  const strategies = [...new Set(rows.map((r) => r.Strategy))]
  const modelKeys = [...new Set(rows.map(rowLabel))]
  return modelKeys.map((mk) => {
    const row: Record<string, string | number> = { model: mk }
    for (const s of strategies) {
      const found = rows.find((r) => rowLabel(r) === mk && r.Strategy === s)
      row[s] = found ? Number(found[metric]) : 0
    }
    return row
  })
}

export function heatmapPrAuc(rows: MlRow[]) {
  const strategies = [...new Set(rows.map((r) => r.Strategy))].sort()
  const models = [...new Set(rows.map(rowLabel))].sort()
  const matrix = models.map((m) =>
    strategies.map((s) => {
      const r = rows.find((x) => rowLabel(x) === m && x.Strategy === s)
      return r?.Mean_PR_AUC ?? NaN
    }),
  )
  const flat = matrix.flat().filter((x) => !Number.isNaN(x))
  const vmax = Math.max(...flat, 1e-6)
  return { strategies, models, matrix, vmax }
}
