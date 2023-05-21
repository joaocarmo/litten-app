import type { ImageStyle, TextStyle, ViewStyle } from 'react-native'
import type { ThemeColors } from '@styles/themes'
import type { Typography } from '@styles/typography'
import type { ImageStyle as FastImageStyle } from 'react-native-fast-image'

export type CreateStylesFn<T> = (theme: {
  colors: ThemeColors
  isDark: boolean
  typography: Typography
}) => T

export type ReturnStyle = ViewStyle & TextStyle & ImageStyle & FastImageStyle

export type ThemeFunctionReturn = Record<string, ReturnStyle>

export type ThemeFunction = CreateStylesFn<ThemeFunctionReturn>
