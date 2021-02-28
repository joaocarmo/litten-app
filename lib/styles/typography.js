/**
 * @format
 * @flow
 */

export const base = 14

export const ratio = 1.25

export const fontSize = {
  xxlarge: base * (2 * ratio),
  xlarge: base * (2 * ratio),
  large: base * ratio,
  base,
  small: base / ratio,
  xsmall: base / (2 * ratio),
  xxsmall: base / (2 * ratio),
}

export const fontWeight = {
  lighter: '200',
  light: '400',
  regular: '500',
  bold: '600',
  bolder: '700',
}
