import { Overlay, OverlayInner, OverlayLabel, Spinner } from '../../styles/primitives'

export function ViewLoadingOverlay({ label }: { label: string }) {
  return (
    <Overlay role="status" aria-live="polite" aria-busy="true">
      <OverlayInner>
        <Spinner aria-hidden />
        <OverlayLabel>{label}</OverlayLabel>
      </OverlayInner>
    </Overlay>
  )
}
