/**
 * @format
 * @flow
 */

/**
 * @type {Object.<string, string>}
 */
const colors = {
  // Official color palette (light)
  black: '#000000',
  blue: '#39a4f2',
  darkBlue: '#263238',
  darkerGray: '#474545',
  darkGray: '#6a6767',
  gray: '#c4c4c4',
  lightBlue: '#84bff1',
  lighterBlue: '#e0effb',
  lighterGray: '#e5e5e5',
  lightGray: '#eff1f3',
  purple: '#7239f2',
  red: '#e30000',
  white: '#ffffff',
  // Official color palette (dark)
  sepia: '#a69e93',
  lightBlack: '#181a1b',
  lighterBlack: '#202324',
  lightPurple: '#8663d3',
  darkOrange: '#876439',
  lightDarkOrange: '#f3d7b9',
  lighterDarkOrange: '#f3e3d2',
  // Outside the official color palette
  darkRed: '#9f3a38',
  lightRed: '#fff6f6',
  iosGray: '#d0d4da',
  iosLightGray: '#dcdee1',
  iosLoader: '#999999',
}

export type Colors = typeof colors

export default colors
