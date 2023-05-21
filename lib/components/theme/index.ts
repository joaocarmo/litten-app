import { createContext } from 'react'
import { THEME_SYSTEM } from '@utils/constants'
import type { Context } from 'react'
import { Colors } from '@styles/colors'
import themes from '@styles/themes'
import typography from '@styles/typography'
import type { ThemePreferences } from '@store/types'
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
  colors: Object(Colors),
  isDark: false,
  scheme: THEME_SYSTEM,
  theme: themes.light,
  typography,
  userScheme: THEME_SYSTEM,
}

const ThemeContext: Context<ThemeConfig> =
  createContext<ThemeConfig>(themeDefaults)

export { ThemeContext }
