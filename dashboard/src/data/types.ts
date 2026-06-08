export type PaysimMeta = {
  is_sample?: boolean
  total_rows: number
  fraud_rate: number
  amount_log_clip: [number, number]
  step_clip: [number, number]
  scatter_source_rows: number
  generated_at: string
}

export type PaysimSummary = {
  meta: PaysimMeta
  class_balance: { label: string; count: number }[]
  by_type: {
    type: string
    count: number
    fraud_count: number
    fraud_rate: number
  }[]
  amount_histogram: { bin_start: number; bin_end: number; count: number }[]
  step_histogram: { bin_start: number; bin_end: number; count: number }[]
  flagged_cross: {
    isFlaggedFraud: number
    isFraud: number
    count: number
  }[]
  sample_scatter: { step: number; log_amount: number; isFraud: number }[]
}

export type MlRow = {
  Family: string
  Model: string
  Strategy: string
  Mean_Recall: number
  Mean_Precision: number
  Mean_F1: number
  Mean_PR_AUC: number
  Mean_ROC_AUC: number
}

export type MlResults = {
  meta: { generated_at: string; source?: string }
  rows: MlRow[]
}
