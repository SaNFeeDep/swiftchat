import { dark } from './dark'
import { white } from './white'

export { GlobalStyle } from './GlobalStyle'

export const themes = {
  white,
  dark,
} as const

export type ThemeColorsType = keyof typeof themes

export { dark, white }
