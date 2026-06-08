import styled from 'styled-components'

const Panel = styled.div<{ $active: boolean }>`
  display: ${({ $active }) => ($active ? 'block' : 'none')};
`

export function ViewPanel({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <Panel role="tabpanel" hidden={!active} $active={active}>
      {children}
    </Panel>
  )
}
