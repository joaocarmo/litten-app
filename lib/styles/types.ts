import type { ImageStyle, TextStyle, ViewStyle } from 'react-native'
import type { Theme } from '@styles/themes'
import type { Typography } from '@styles/typography'
import type { ImageStyle as FastImageStyle } from 'react-native-fast-image'

export type CreateStylesFn<T> = (theme: {
  colors: Theme['colors']
  isDark: boolean
  typography: Typography
}) => T

export type ReturnStyle = ViewStyle & TextStyle & ImageStyle & FastImageStyle

export type ThemeFunctionReturn = Record<string, ReturnStyle>

export type ThemeFunction = CreateStylesFn<ThemeFunctionReturn>
