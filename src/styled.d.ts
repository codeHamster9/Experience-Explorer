import 'styled-components'
import { Theme } from './theme/theme.types'

declare module 'styled-components' {
  export type DefaultTheme = Theme
}