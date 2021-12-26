/**
 * @format
 * @flow
 */

import colors from './colors'

/**
 * @type {Object.<string, string>}
 */
const lightTheme = {
  colors: {
    text: colors.black,
    textAlt: colors.white,
    background: colors.white,
    backgroundAlt: colors.black,
    backgroundElement: colors.iosGray,
    backgroundElementLight: colors.iosLightGray,
    primary: colors.purple,
    secondary: colors.blue,
    secondaryLight: colors.lightBlue,
    secondaryLighter: colors.lighterBlue,
    danger: colors.red,
    dangerDark: colors.darkRed,
    dangerLight: colors.lightRed,
    neutral: colors.gray,
    neutralDark: colors.darkGray,
    neutralDarker: colors.darkerGray,
    neutralLight: colors.lightGray,
    neutralLighter: colors.lighterGray,
  },
}

const darkTheme = lightTheme

const themes = {
  light: lightTheme,
  dark: darkTheme,
}

export type Theme = typeof lightTheme

export { lightTheme, darkTheme }

export default themes
