import { useState } from 'react'
import { ThemeProvider } from 'styled-components'

import { GlobalStyle, ThemeColorsType, themes, white } from '../theme'
import { ThemeSwitcherContext } from '../context'

export type ThemeType = typeof white

export const getThemeByName = (name: ThemeColorsType) => themes[name]

export type IThemeSwitcher = {
  themeName: ThemeColorsType
  setThemeName: (theme: ThemeColorsType) => void
}

export const ThemeSwitcher: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [themeName, setCurrThemeName] = useState<ThemeColorsType>('white')

  const setThemeName = (theme: ThemeColorsType) => {
    if (theme !== themeName) setCurrThemeName(theme ?? 'inherit')
  }

  return (
    <ThemeSwitcherContext.Provider value={{ themeName, setThemeName }}>
      <ThemeProvider theme={getThemeByName(themeName)}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ThemeSwitcherContext.Provider>
  )
}
