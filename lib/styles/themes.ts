import { Colors } from './colors'

type ColorKeys =
  | 'text'
  | 'textAlt'
  | 'background'
  | 'backgroundAlt'
  | 'backgroundElement'
  | 'backgroundElementLight'
  | 'primary'
  | 'secondary'
  | 'secondaryLight'
  | 'secondaryLighter'
  | 'danger'
  | 'dangerDark'
  | 'dangerLight'
  | 'neutral'
  | 'neutralDark'
  | 'neutralDarker'
  | 'neutralLight'
  | 'neutralLighter'

export type ThemeColors = Record<ColorKeys, Colors>

export interface Theme {
  colors: ThemeColors
}

export type ColorScheme = 'light' | 'dark'

type Themes = Record<ColorScheme, Theme>

export const lightTheme: Theme = {
  colors: {
    text: Colors.Black,
    textAlt: Colors.White,
    background: Colors.White,
    backgroundAlt: Colors.Black,
    backgroundElement: Colors.IosGray,
    backgroundElementLight: Colors.IosLightGray,
    primary: Colors.Purple,
    secondary: Colors.Blue,
    secondaryLight: Colors.LightBlue,
    secondaryLighter: Colors.LighterBlue,
    danger: Colors.Red,
    dangerDark: Colors.DarkRed,
    dangerLight: Colors.LightRed,
    neutral: Colors.Gray,
    neutralDark: Colors.DarkGray,
    neutralDarker: Colors.DarkerGray,
    neutralLight: Colors.LightGray,
    neutralLighter: Colors.LighterGray,
  },
}

export const darkTheme: Theme = {
  colors: {
    text: Colors.Sepia,
    textAlt: Colors.White,
    background: Colors.LighterBlack,
    backgroundAlt: Colors.DarkGray,
    backgroundElement: Colors.IosGray,
    backgroundElementLight: Colors.IosLightGray,
    primary: Colors.LightBlue,
    secondary: Colors.DarkOrange,
    secondaryLight: Colors.LightDarkOrange,
    secondaryLighter: Colors.LighterDarkOrange,
    danger: Colors.DarkRed,
    dangerDark: Colors.DarkRed,
    dangerLight: Colors.LightRed,
    neutral: Colors.InvertedGray,
    neutralDark: Colors.DarkGray,
    neutralDarker: Colors.DarkerGray,
    neutralLight: Colors.LightBlack,
    neutralLighter: Colors.LighterBlack,
  },
}

const themes: Themes = {
  light: lightTheme,
  dark: darkTheme,
}

export default themes
