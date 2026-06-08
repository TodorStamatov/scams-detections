import styled from 'styled-components'
import type { View } from '../view/types'
import { ViewToggle } from '../view/ViewToggle'
import { darkMode } from '../../styles/theme'

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid ${({ theme }) => theme.colors.zinc200};
  background: color-mix(in srgb, ${({ theme }) => theme.colors.white} 90%, transparent);
  padding: 1rem;
  backdrop-filter: blur(8px);

  ${darkMode} {
    border-color: ${({ theme }) => theme.colors.zinc800};
    background: color-mix(in srgb, ${({ theme }) => theme.colors.zinc950} 90%, transparent);
  }
`

const Inner = styled.div`
  margin: 0 auto;
  max-width: ${({ theme }) => theme.maxWidth.content};
`

const TitleBlock = styled.div`
  margin-bottom: 1rem;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 1.25rem;
  }
`

const Title = styled.h1`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.5rem;
  }
`

const Subtitle = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.zinc500};

  ${darkMode} {
    color: ${({ theme }) => theme.colors.zinc400};
  }
`

const ToggleRow = styled.div`
  display: flex;
  justify-content: center;
`

export const AppHeader = ({
  activeView,
  viewSwitching,
  onViewChange,
}: {
  activeView: View
  viewSwitching: boolean
  onViewChange: (view: View) => void
}) => {
  return (
    <Header>
      <Inner>
        <TitleBlock>
          <Title>PaySim · детекция на измами</Title>
          <Subtitle>Визуализация на данни и резултати от ML анализа (статични JSON)</Subtitle>
        </TitleBlock>
        <ToggleRow>
          <ViewToggle active={activeView} disabled={viewSwitching} onChange={onViewChange} />
        </ToggleRow>
      </Inner>
    </Header>
  )
};
