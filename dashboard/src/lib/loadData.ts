import type { MlResults, PaysimSummary } from '../data/types'

/** Avoid parsing SPA/error HTML as JSON (Unexpected token '<'). */
async function fetchJsonIfOk<T>(path: string): Promise<T | null> {
  const r = await fetch(path)
  if (!r.ok) return null
  const text = await r.text()
  const trimmed = text.trimStart()
  if (trimmed.startsWith('<')) return null
  try {
    return JSON.parse(text) as T
  } catch {
    return null
  }
}

function dataPaths(base: string, name: string): string {
  return `${base}/data/${name}`.replace(/\/+/g, '/')
}

export async function loadPaysimSummary(): Promise<PaysimSummary> {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  const paths = [dataPaths(base, 'paysim_summary.json'), dataPaths(base, 'paysim_summary.sample.json')]
  for (const p of paths) {
    const data = await fetchJsonIfOk<PaysimSummary>(p)
    if (data) return data
  }
  throw new Error(
    'Не е намерен валиден PaySim JSON. Провери dashboard/public/data/ (изтрий повреден paysim_summary.json или пусни python scripts/export_dashboard_data.py).',
  )
}

export async function loadMlResults(): Promise<MlResults | null> {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  return fetchJsonIfOk<MlResults>(dataPaths(base, 'ml_results.json'))
}
