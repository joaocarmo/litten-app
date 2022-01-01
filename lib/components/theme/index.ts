import { createContext } from 'react'
import type { Colors } from '@styles/colors'
import type { Theme } from '@styles/themes'
import type { Typography } from '@styles/typography'

export type ThemeConfig = {
  colors: Colors
  isDark: boolean
  scheme: (string | null | undefined) | 'light' | 'dark'
  theme: Theme
  typography: Typography
}

const themeDefaults = {
  colors: {},
  isDark: false,
  scheme: 'light',
  theme: {},
  typography: {},
}

const ThemeContext: React.Context<ThemeConfig> =
  createContext<ThemeConfig>(themeDefaults)

export { ThemeContext }
