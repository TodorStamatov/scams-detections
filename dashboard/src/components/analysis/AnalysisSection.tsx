import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { MlResults } from '../../data/types'
import { CHART_COLORS } from '../../constants/charts'
import { useChartGridStroke } from '../../hooks/useChartGridStroke'
import { heatmapPrAuc, pivotForGroupedBars, rowLabel } from '../../lib/mlMetrics'
import { ChartCardTall, ChartTitle, KpiGrid, MutedText } from '../../styles/primitives'
import { Section } from '../ui/Section'
import { KpiCard } from '../ui/KpiCard'
import { Heatmap } from './Heatmap'
import { MlEmptyState } from './MlEmptyState'
import { MlResultsTable } from './MlResultsTable'

export function AnalysisSection({ ml }: { ml: MlResults | null }) {
  const gridStroke = useChartGridStroke()

  const bestPr = useMemo(() => {
    if (!ml?.rows.length) return null
    return [...ml.rows].sort((a, b) => b.Mean_PR_AUC - a.Mean_PR_AUC)[0]
  }, [ml])

  const bestRec = useMemo(() => {
    if (!ml?.rows.length) return null
    return [...ml.rows].sort((a, b) => b.Mean_Recall - a.Mean_Recall)[0]
  }, [ml])

  const barData = ml ? pivotForGroupedBars(ml.rows, 'Mean_F1') : []
  const hm = ml ? heatmapPrAuc(ml.rows) : null
  const strategyKeys = ml ? [...new Set(ml.rows.map((r) => r.Strategy))] : []

  return (
    <Section id="analysis" title="Резултати от ML анализа">
      {!ml || !ml.rows.length ? (
        <MlEmptyState />
      ) : (
        <>
          <MutedText>
            При силен дисбаланс <strong>PR AUC</strong> (average precision) и <strong>Recall</strong>{' '}
            са по-информативни от accuracy. По-долу са обобщени mean метрики от 5-fold CV (както в
            notebook).
          </MutedText>

          <KpiGrid $cols={2}>
            <KpiCard
              label="Най-добър Mean PR AUC"
              value={
                bestPr
                  ? `${rowLabel(bestPr)} / ${bestPr.Strategy} → ${bestPr.Mean_PR_AUC.toFixed(4)}`
                  : '—'
              }
            />
            <KpiCard
              label="Най-висок Mean Recall"
              value={
                bestRec
                  ? `${rowLabel(bestRec)} / ${bestRec.Strategy} → ${bestRec.Mean_Recall.toFixed(4)}`
                  : '—'
              }
            />
          </KpiGrid>

          <MlResultsTable rows={ml.rows} />

          <ChartCardTall>
            <ChartTitle>Mean F1 по модел и стратегия</ChartTitle>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={barData} margin={{ left: 8, bottom: 60 }} barCategoryGap="12%">
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis
                  dataKey="model"
                  angle={-20}
                  textAnchor="end"
                  interval={0}
                  height={80}
                  tick={{ fontSize: 10 }}
                />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                {strategyKeys.map((s, idx) => (
                  <Bar
                    key={s}
                    dataKey={s}
                    fill={CHART_COLORS[idx % CHART_COLORS.length]}
                    name={s}
                    radius={[2, 2, 0, 0]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </ChartCardTall>

          {hm && (
            <div style={{ marginTop: '0.75rem' }}>
              <ChartTitle>Heatmap: Mean PR AUC (модел × стратегия)</ChartTitle>
              <Heatmap
                strategies={hm.strategies}
                models={hm.models}
                matrix={hm.matrix}
                vmax={hm.vmax}
              />
            </div>
          )}
        </>
      )}
    </Section>
  )
}
