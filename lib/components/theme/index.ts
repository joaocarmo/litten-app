import { createContext } from 'react'
import { THEME_SYSTEM } from '@utils/constants'
import type { Context } from 'react'
import colors from '@styles/colors'
import themes from '@styles/themes'
import typography from '@styles/typography'
import type { ThemePreferences } from '@store/types'
import type { Colors } from '@styles/colors'
import type { Theme } from '@styles/themes'
import type { Typography } from '@styles/typography'

export type ThemeConfig = {
  colors: Colors
  isDark: boolean
  scheme: ThemePreferences
  theme: Theme
  typography: Typography
  userScheme: ThemePreferences
}

const themeDefaults = {
  colors,
  isDark: false,
  scheme: THEME_SYSTEM as typeof THEME_SYSTEM,
  theme: themes.light,
  typography,
  userScheme: THEME_SYSTEM as typeof THEME_SYSTEM,
}

const ThemeContext: Context<ThemeConfig> =
  createContext<ThemeConfig>(themeDefaults)

export { ThemeContext }
