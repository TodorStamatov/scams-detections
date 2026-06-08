import styled from 'styled-components'
import { darkMode } from '../../styles/theme'

const Wrap = styled.div`
  overflow-x: auto;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.zinc200};

  ${darkMode} {
    border-color: ${({ theme }) => theme.colors.zinc700};
  }
`

const Table = styled.table`
  width: 100%;
  min-width: 480px;
  border-collapse: collapse;
  font-size: 0.875rem;
`

const Th = styled.th`
  border: 1px solid ${({ theme }) => theme.colors.zinc200};
  background: ${({ theme }) => theme.colors.zinc50};
  padding: 0.5rem;
  text-align: center;
  font-weight: 500;

  &:first-child {
    text-align: left;
  }

  ${darkMode} {
    border-color: ${({ theme }) => theme.colors.zinc700};
    background: ${({ theme }) => theme.colors.zinc800};
  }
`

const Td = styled.td<{ $tabular?: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.zinc200};
  padding: 0.5rem;
  text-align: ${({ $tabular }) => ($tabular ? 'center' : 'left')};
  font-variant-numeric: ${({ $tabular }) => ($tabular ? 'tabular-nums' : 'normal')};
  font-weight: ${({ $tabular }) => ($tabular ? 'normal' : 500)};

  ${darkMode} {
    border-color: ${({ theme }) => theme.colors.zinc700};
  }
`

export function Heatmap({
  strategies,
  models,
  matrix,
  vmax,
}: {
  strategies: string[]
  models: string[]
  matrix: number[][]
  vmax: number
}) {
  return (
    <Wrap>
      <Table>
        <thead>
          <tr>
            <Th style={{ textAlign: 'left' }}>Модел</Th>
            {strategies.map((s) => (
              <Th key={s}>{s}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {models.map((m, i) => (
            <tr key={m}>
              <Td>{m}</Td>
              {strategies.map((s, j) => {
                const v = matrix[i][j]
                const t = Number.isNaN(v) ? 0 : v / vmax
                const bg = `rgba(99, 102, 241, ${0.12 + t * 0.78})`
                return (
                  <Td key={s} $tabular style={{ backgroundColor: bg }}>
                    {Number.isNaN(v) ? '—' : v.toFixed(3)}
                  </Td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrap>
  )
}
