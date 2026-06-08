import styled, { css, keyframes } from 'styled-components'
import { darkMode } from './theme'

export const PageShell = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.zinc50};
  color: ${({ theme }) => theme.colors.zinc900};

  ${darkMode} {
    background: ${({ theme }) => theme.colors.zinc950};
    color: ${({ theme }) => theme.colors.zinc100};
  }
`

export const CenteredScreen = styled.div<{ $padded?: boolean }>`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  background: ${({ theme }) => theme.colors.zinc50};
  color: ${({ theme }) => theme.colors.zinc600};
  ${({ $padded }) => $padded && 'padding: 1.5rem;'}

  ${darkMode} {
    background: ${({ theme }) => theme.colors.zinc950};
    color: ${({ theme }) => theme.colors.zinc300};
  }
`

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.red600};
`

export const Main = styled.main`
  position: relative;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.maxWidth.content};
  padding: 2.5rem 1rem;
`

export const ContentWrap = styled.div<{ $hidden?: boolean }>`
  ${({ $hidden }) =>
    $hidden &&
    css`
      pointer-events: none;
      user-select: none;
      opacity: 0;
    `}
`

export const KpiGrid = styled.div<{ $cols?: 2 | 3 }>`
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(${({ $cols = 3 }) => $cols}, minmax(0, 1fr));
  }
`

export const Grid2Col = styled.div`
  display: grid;
  gap: 2rem;
  margin-bottom: 2.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const chartCardBase = css`
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.zinc200};
  background: ${({ theme }) => theme.colors.white};
  padding: 1rem;

  ${darkMode} {
    border-color: ${({ theme }) => theme.colors.zinc800};
    background: ${({ theme }) => theme.colors.zinc900};
  }
`

export const ChartCard = styled.div<{ $height?: string }>`
  ${chartCardBase}
  height: ${({ $height }) => $height ?? '18rem'};
  margin-bottom: 2.5rem;
`

export const ChartCardInline = styled.div<{ $height?: string }>`
  ${chartCardBase}
  height: ${({ $height }) => $height ?? '18rem'};
`

export const ChartCardTall = styled(ChartCard)`
  height: 24rem;
`

export const ChartCardScatter = styled.div`
  ${chartCardBase}
  height: 26.25rem;
`

export const ChartTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.zinc600};

  ${darkMode} {
    color: ${({ theme }) => theme.colors.zinc300};
  }
`

export const MutedText = styled.p`
  margin: 0 0 1.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.zinc600};

  ${darkMode} {
    color: ${({ theme }) => theme.colors.zinc400};
  }
`

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 20;
  display: flex;
  min-height: 50vh;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  background: color-mix(in srgb, ${({ theme }) => theme.colors.zinc50} 90%, transparent);
  backdrop-filter: blur(4px);

  ${darkMode} {
    background: color-mix(in srgb, ${({ theme }) => theme.colors.zinc950} 90%, transparent);
  }
`

export const OverlayInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`

export const Spinner = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.indigo600};
  border-top-color: transparent;
  animation: ${spin} 0.8s linear infinite;

  ${darkMode} {
    border-color: ${({ theme }) => theme.colors.indigo400};
    border-top-color: transparent;
  }
`

export const OverlayLabel = styled.p`
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.zinc700};

  ${darkMode} {
    color: ${({ theme }) => theme.colors.zinc200};
  }
`
