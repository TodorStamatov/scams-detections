import styled from 'styled-components'
import { darkMode } from '../../styles/theme'

const Card = styled.div`
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.zinc200};
  background: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);

  ${darkMode} {
    border-color: ${({ theme }) => theme.colors.zinc700};
    background: ${({ theme }) => theme.colors.zinc900};
  }
`

const Label = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.zinc500};

  ${darkMode} {
    color: ${({ theme }) => theme.colors.zinc400};
  }
`

const Value = styled.p`
  margin: 0.25rem 0 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.zinc900};

  ${darkMode} {
    color: ${({ theme }) => theme.colors.zinc50};
  }
`

export function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Card>
  )
}
