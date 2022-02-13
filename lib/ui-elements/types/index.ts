import type { ComponentType } from 'react'
import type {
  ColorValue,
  StyleProp,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native'

export type IconComponentProps = {
  fill?: ColorValue
  height?: number
  stroke?: ColorValue
  style?: StyleProp<ImageStyle>
  width?: number
}

export type IconTypeComponent = ComponentType<IconComponentProps>

export type BasicImageSource =
  | string
  | {
      uri: string
    }

export type ImageSource = string | ImageSourcePropType
