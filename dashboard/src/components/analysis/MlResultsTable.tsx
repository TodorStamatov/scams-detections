import { useMemo, useState } from 'react'
import styled from 'styled-components'
import type { MlRow } from '../../data/types'
import { darkMode } from '../../styles/theme'

const SORT_KEYS = [
  'Mean_PR_AUC',
  'Mean_Recall',
  'Mean_F1',
  'Mean_Precision',
  'Mean_ROC_AUC',
] as const satisfies readonly (keyof MlRow)[]

const Wrap = styled.div`
  margin-bottom: 2.5rem;
  overflow-x: auto;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.zinc200};
  background: ${({ theme }) => theme.colors.white};

  ${darkMode} {
    border-color: ${({ theme }) => theme.colors.zinc800};
    background: ${({ theme }) => theme.colors.zinc900};
  }
`

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.zinc200};
  padding: 0.75rem;

  ${darkMode} {
    border-color: ${({ theme }) => theme.colors.zinc800};
  }
`

const ToolbarLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.zinc500};
`

const SortButton = styled.button<{ $active: boolean }>`
  border: none;
  border-radius: 0.5rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  cursor: pointer;

  ${({ $active, theme }) =>
    $active
      ? `
    background: ${theme.colors.indigo600};
    color: ${theme.colors.white};
  `
      : `
    background: ${theme.colors.zinc100};
    color: ${theme.colors.zinc700};

    &:hover {
      background: ${theme.colors.zinc200};
    }

    ${darkMode} {
      background: ${theme.colors.zinc800};
      color: ${theme.colors.zinc200};

      &:hover {
        background: ${theme.colors.zinc700};
      }
    }
  `}
`

const Table = styled.table`
  width: 100%;
  min-width: 640px;
  text-align: left;
  font-size: 0.875rem;
  border-collapse: collapse;
`

const Thead = styled.thead`
  background: ${({ theme }) => theme.colors.zinc50};

  ${darkMode} {
    background: color-mix(in srgb, ${({ theme }) => theme.colors.zinc800} 80%, transparent);
  }
`

const Th = styled.th`
  padding: 0.75rem;
`

const Tr = styled.tr`
  border-top: 1px solid ${({ theme }) => theme.colors.zinc100};

  ${darkMode} {
    border-color: ${({ theme }) => theme.colors.zinc800};
  }
`

const Td = styled.td<{ $medium?: boolean; $tabular?: boolean }>`
  padding: 0.75rem;
  font-weight: ${({ $medium }) => ($medium ? 500 : 400)};
  font-variant-numeric: ${({ $tabular }) => ($tabular ? 'tabular-nums' : 'normal')};
`

export function MlResultsTable({ rows }: { rows: MlRow[] }) {
  const [sortKey, setSortKey] = useState<(typeof SORT_KEYS)[number]>('Mean_PR_AUC')

  const sortedRows = useMemo(
    () => [...rows].sort((a, b) => Number(b[sortKey]) - Number(a[sortKey])),
    [rows, sortKey],
  )

  return (
    <Wrap>
      <Toolbar>
        <ToolbarLabel>Сортирай по:</ToolbarLabel>
        {SORT_KEYS.map((k) => (
          <SortButton key={k} type="button" $active={sortKey === k} onClick={() => setSortKey(k)}>
            {k.replace('Mean_', '')}
          </SortButton>
        ))}
      </Toolbar>
      <Table>
        <Thead>
          <tr>
            <Th>Family</Th>
            <Th>Model</Th>
            <Th>Strategy</Th>
            <Th>Recall</Th>
            <Th>Precision</Th>
            <Th>F1</Th>
            <Th>PR AUC</Th>
            <Th>ROC AUC</Th>
          </tr>
        </Thead>
        <tbody>
          {sortedRows.map((r, i) => (
            <Tr key={i}>
              <Td>{r.Family}</Td>
              <Td $medium>{r.Model}</Td>
              <Td>{r.Strategy}</Td>
              <Td $tabular>{r.Mean_Recall.toFixed(4)}</Td>
              <Td $tabular>{r.Mean_Precision.toFixed(4)}</Td>
              <Td $tabular>{r.Mean_F1.toFixed(4)}</Td>
              <Td $tabular>{r.Mean_PR_AUC.toFixed(4)}</Td>
              <Td $tabular>{r.Mean_ROC_AUC.toFixed(4)}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Wrap>
  )
}
