import type { ComponentType } from 'react'
import type { ColorValue, ImageStyle } from 'react-native'

export type IconComponentProps = {
  height?: number
  width?: number
  fill?: ColorValue
  style?: ImageStyle
}

export type IconTypeComponent = ComponentType<IconComponentProps>

export type ImageSource =
  | string
  | {
      uri: string
    }
