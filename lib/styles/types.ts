import type { ImageStyle, TextStyle, ViewStyle } from 'react-native/types'
import type { Theme } from '@styles/themes'
import type { Typography } from '@styles/typography'

export type CreateStylesFn<T> = (theme: {
  colors: Theme['colors']
  isDark: boolean
  typography: Typography
}) => T

export type ReturnStyle = ViewStyle & TextStyle & ImageStyle

export type ThemeFunctionReturn = Record<string, ReturnStyle>

export type ThemeFunction = CreateStylesFn<ThemeFunctionReturn>
