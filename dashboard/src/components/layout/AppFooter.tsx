import styled from 'styled-components'
import { darkMode } from '../../styles/theme'

const Footer = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.zinc200};
  padding-top: 2rem;
  text-align: center;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.zinc500};

  ${darkMode} {
    border-color: ${({ theme }) => theme.colors.zinc800};
    color: ${({ theme }) => theme.colors.zinc400};
  }
`

export function AppFooter() {
  return (
    <Footer>PaySim synthetic dataset · дипломна визуализация · JSON агрегати офлайн</Footer>
  )
}
