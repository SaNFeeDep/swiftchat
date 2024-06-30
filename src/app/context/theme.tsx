import { createContext } from 'react'
import { ThemeColorsType } from '../theme'

type ThemeSwitcherContextType = {
  themeName: ThemeColorsType
  setThemeName: (theme: ThemeColorsType) => void
}

export const ThemeSwitcherContext = createContext<ThemeSwitcherContextType>({
  themeName: 'white',
  setThemeName: () => {},
})
