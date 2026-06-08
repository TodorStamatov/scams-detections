import styled from 'styled-components'
import { darkMode } from '../../styles/theme'

const Banner = styled.div`
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.amber200};
  background: ${({ theme }) => theme.colors.amber50};
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.amber900};

  ${darkMode} {
    border-color: ${({ theme }) => theme.colors.amber900};
    background: color-mix(in srgb, ${({ theme }) => theme.colors.amber950} 40%, transparent);
    color: #fde68a;
  }
`

const Code = styled.code`
  border-radius: 0.25rem;
  background: color-mix(in srgb, ${({ theme }) => theme.colors.amber100} 80%, transparent);
  padding: 0 0.25rem;

  ${darkMode} {
    background: color-mix(in srgb, ${({ theme }) => theme.colors.amber900} 50%, transparent);
  }
`

export function SampleBanner() {
  return (
    <Banner>
      Показват се примерни PaySim агрегати (<Code>paysim_summary.sample.json</Code>). За пълни
      агрегати от реалния CSV:{' '}
      <Code>python scripts/export_dashboard_data.py</Code>
    </Banner>
  )
}
