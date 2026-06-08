import styled from 'styled-components'
import { darkMode } from '../../styles/theme'

const Box = styled.div`
  border-radius: 0.75rem;
  border: 1px dashed ${({ theme }) => theme.colors.zinc300};
  background: color-mix(in srgb, ${({ theme }) => theme.colors.zinc100} 50%, transparent);
  padding: 2rem;
  text-align: center;

  ${darkMode} {
    border-color: ${({ theme }) => theme.colors.zinc600};
    background: color-mix(in srgb, ${({ theme }) => theme.colors.zinc900} 50%, transparent);
  }
`

const Title = styled.p`
  margin: 0 0 0.5rem;
  font-weight: 500;
`

const Hint = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.zinc600};

  ${darkMode} {
    color: ${({ theme }) => theme.colors.zinc400};
  }
`

const Code = styled.code`
  border-radius: 0.25rem;
  background: ${({ theme }) => theme.colors.zinc200};
  padding: 0 0.25rem;

  ${darkMode} {
    background: ${({ theme }) => theme.colors.zinc800};
  }
`

export function MlEmptyState() {
  return (
    <Box>
      <Title>Няма зареден ml_results.json</Title>
      <Hint>
        Пусни notebook-а до края и изпълни експорт клетката (секция 8), или копирай пример:{' '}
        <Code>
          cp dashboard/public/data/ml_results.sample.json dashboard/public/data/ml_results.json
        </Code>
      </Hint>
    </Box>
  )
}
