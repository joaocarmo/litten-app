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
    text: colors.white,
    primary: colors.purple,
    secondary: colors.blue,
    danger: colors.red,
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
