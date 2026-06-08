import styled from 'styled-components'
import { darkMode } from '../../styles/theme'

const SectionRoot = styled.section`
  margin-bottom: 4rem;
  scroll-margin-top: 6rem;
`

const Title = styled.h2`
  margin: 0 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.zinc200};
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.zinc900};

  ${darkMode} {
    border-color: ${({ theme }) => theme.colors.zinc700};
    color: ${({ theme }) => theme.colors.zinc100};
  }
`

export function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <SectionRoot id={id}>
      <Title>{title}</Title>
      {children}
    </SectionRoot>
  )
}
