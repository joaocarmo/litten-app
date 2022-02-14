import type { ComponentType } from 'react'
import type {
  ColorValue,
  ImageRequireSource,
  ImageStyle,
  StyleProp,
} from 'react-native'
import type { Source } from 'react-native-fast-image'

export type IconComponentProps = {
  fill?: ColorValue
  height?: number
  stroke?: ColorValue
  style?: StyleProp<ImageStyle>
  width?: number
}

export type IconTypeComponent = ComponentType<IconComponentProps>

export type BasicImageSource = string | Source

export type ImageSource = BasicImageSource | ImageRequireSource
