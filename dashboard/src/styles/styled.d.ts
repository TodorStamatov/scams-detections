import 'styled-components'
import type { AppTheme } from './theme'

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- styled-components theme merge
  export interface DefaultTheme extends AppTheme {}
}
