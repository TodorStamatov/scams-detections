import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { PaysimSummary } from '../../data/types'
import { CHART_COLORS } from '../../constants/charts'
import { useChartGridStroke } from '../../hooks/useChartGridStroke'
import { formatCount, formatPct } from '../../lib/format'
import {
  ChartCard,
  ChartCardInline,
  ChartCardScatter,
  ChartTitle,
  Grid2Col,
  KpiGrid,
} from '../../styles/primitives'
import { Section } from '../ui/Section'
import { KpiCard } from '../ui/KpiCard'

export const DatasetSection = ({ paysim }: { paysim: PaysimSummary }) => {
  const gridStroke = useChartGridStroke()

  const byTypeChart = useMemo(
    () =>
      paysim.by_type.map((r) => ({
        type: r.type,
        count: r.count,
        fraud_rate_pct: 100 * r.fraud_rate,
      })),
    [paysim.by_type],
  )

  const amtChart = useMemo(
    () =>
      paysim.amount_histogram.map((b) => ({
        label: `${b.bin_start.toFixed(1)}–${b.bin_end.toFixed(1)}`,
        count: b.count,
      })),
    [paysim.amount_histogram],
  )

  const scatterData = useMemo(
    () =>
      paysim.sample_scatter.map((p) => ({
        x: p.step,
        y: p.log_amount,
        isFraud: p.isFraud,
        fill: p.isFraud ? '#ec4899' : '#94a3b8',
      })),
    [paysim.sample_scatter],
  )

  return (
    <Section id="dataset" title="Данни (PaySim)">
      <KpiGrid>
        <KpiCard label="Общо транзакции" value={paysim.meta.total_rows.toLocaleString('bg-BG')} />
        <KpiCard label="Дял измами" value={formatPct(paysim.meta.fraud_rate)} />
        <KpiCard
          label="Генерирано (UTC)"
          value={new Date(paysim.meta.generated_at).toLocaleString('bg-BG')}
        />
      </KpiGrid>

      <Grid2Col>
        <ChartCardInline>
          <ChartTitle>Баланс на класовете</ChartTitle>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={paysim.class_balance}
                dataKey="count"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, percent }) =>
                  `${name} (${((percent ?? 0) * 100).toFixed(2)}%)`
                }
              >
                {paysim.class_balance.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCount(Number(value))} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCardInline>

        <ChartCardInline>
          <ChartTitle>Тип транзакция (брой)</ChartTitle>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={byTypeChart} margin={{ bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="type" angle={-25} textAnchor="end" height={60} tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={formatCount} />
              <Tooltip formatter={(value) => formatCount(Number(value))} />
              <Bar dataKey="count" fill="#6366f1" name="Брой" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCardInline>
      </Grid2Col>

      <ChartCard $height="20rem">
        <ChartTitle>Дял измами по тип транзакция (%)</ChartTitle>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={byTypeChart} margin={{ bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis dataKey="type" angle={-25} textAnchor="end" height={60} tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="fraud_rate_pct" fill="#f97316" name="Измами %" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard $height="20rem">
        <ChartTitle>Хистограма на log1p(amount) (фиксирани бинове 0–25)</ChartTitle>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={amtChart}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis dataKey="label" tick={{ fontSize: 9 }} interval={Math.ceil(amtChart.length / 12)} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="count" fill="#22c55e" name="Брой" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCardScatter>
        <ChartTitle>Извадка: step vs log(amount) (цвят = измама)</ChartTitle>
        <ResponsiveContainer width="100%" height="92%">
          <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 0 }} data={scatterData}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis type="number" dataKey="x" name="step" tick={{ fontSize: 11 }} />
            <YAxis type="number" dataKey="y" name="log1p(amount)" tick={{ fontSize: 11 }} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Транзакции" dataKey="y" fillOpacity={0.65}>
              {scatterData.map((_, i) => (
                <Cell key={i} fill={scatterData[i].fill} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </ChartCardScatter>
    </Section>
  )
};
