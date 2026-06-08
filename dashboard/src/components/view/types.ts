export type View = 'dataset' | 'analysis'

export const VIEW_LABELS: Record<View, string> = {
  dataset: 'Данни',
  analysis: 'Анализ',
}

export const MIN_VIEW_SWITCH_MS = 320
