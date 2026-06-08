import styled from 'styled-components'
import type { View } from './types'
import { VIEW_LABELS } from './types'
import { darkMode } from '../../styles/theme'

const TabList = styled.div<{ $disabled?: boolean }>`
  display: inline-flex;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.zinc200};
  background: ${({ theme }) => theme.colors.zinc100};
  padding: 0.25rem;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};

  ${darkMode} {
    border-color: ${({ theme }) => theme.colors.zinc700};
    background: ${({ theme }) => theme.colors.zinc800};
  }
`

const TabButton = styled.button<{ $active: boolean }>`
  min-width: 7.5rem;
  border: none;
  border-radius: 0.5rem;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  ${({ $active, theme }) =>
    $active
      ? `
    background: ${theme.colors.white};
    color: ${theme.colors.indigo700};
    box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
    outline: 1px solid color-mix(in srgb, ${theme.colors.zinc200} 80%, transparent);

    ${darkMode} {
      background: ${theme.colors.zinc900};
      color: ${theme.colors.indigo400};
      outline-color: ${theme.colors.zinc600};
    }
  `
      : `
    background: transparent;
    color: ${theme.colors.zinc600};

    &:hover:not(:disabled) {
      color: ${theme.colors.zinc900};
    }

    ${darkMode} {
      color: ${theme.colors.zinc400};

      &:hover:not(:disabled) {
        color: ${theme.colors.zinc100};
      }
    }
  `}
`

export function ViewToggle({
  active,
  disabled,
  onChange,
}: {
  active: View
  disabled?: boolean
  onChange: (view: View) => void
}) {
  const tabs = (Object.keys(VIEW_LABELS) as View[]).map((id) => ({
    id,
    label: VIEW_LABELS[id],
  }))

  return (
    <TabList role="tablist" aria-label="Изглед на таблото" aria-busy={disabled} $disabled={disabled}>
      {tabs.map(({ id, label }) => (
        <TabButton
          key={id}
          type="button"
          role="tab"
          aria-selected={active === id}
          disabled={disabled}
          $active={active === id}
          onClick={() => onChange(id)}
        >
          {label}
        </TabButton>
      ))}
    </TabList>
  )
}
