/**
 * @format
 * @flow
 */

import { createContext } from 'react'
import type { Colors } from 'styles/colors'
import type { Theme } from 'styles/themes'
import type { Typography } from 'styles/typography'

export type ThemeValue = {|
  colors: Colors,
  isDark: boolean,
  scheme: ?string | 'light' | 'dark',
  theme: Theme,
  typography: Typography,
|}

const themeDefaults = {
  colors: {},
  isDark: false,
  scheme: 'light',
  theme: {},
  typography: {},
}

const ThemeContext: React$Context<ThemeValue> =
  createContext<ThemeValue>(themeDefaults)

export { ThemeContext }
