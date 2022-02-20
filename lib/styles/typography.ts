export const base = 14
export const ratio = 1.125

export const fontSize = {
  xxxxlarge: base * ratio ** 5,
  xxxlarge: base * ratio ** 4,
  xxlarge: base * ratio ** 3,
  xlarge: base * ratio ** 2,
  large: base * ratio,
  base,
  small: base / ratio,
  xsmall: base / ratio ** 2,
  xxsmall: base / ratio ** 3,
}

export const fontWeight = {
  lighter: '200',
  light: '400',
  regular: '500',
  bold: '600',
  bolder: '700',
} as const

const typography = {
  base,
  ratio,
  fontSize,
  fontWeight,
}

export type Typography = typeof typography

export default typography
