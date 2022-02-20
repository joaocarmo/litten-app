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

/**
 * @type {Object.<string, string>}
 */
const darkTheme = {
  colors: {
    text: colors.sepia,
    textAlt: colors.white,
    background: colors.lighterBlack,
    backgroundAlt: colors.darkGray,
    backgroundElement: colors.iosGray,
    backgroundElementLight: colors.iosLightGray,
    primary: colors.lightBlue,
    secondary: colors.darkOrange,
    secondaryLight: colors.lightDarkOrange,
    secondaryLighter: colors.lighterDarkOrange,
    danger: colors.darkRed,
    dangerDark: colors.darkRed,
    dangerLight: colors.lightRed,
    neutral: colors.invertedGray,
    neutralDark: colors.darkGray,
    neutralDarker: colors.darkerGray,
    neutralLight: colors.lightBlack,
    neutralLighter: colors.lighterBlack,
  },
}

const themes = {
  light: lightTheme,
  dark: darkTheme,
}

export type Theme = typeof lightTheme

export { lightTheme, darkTheme }

export default themes
