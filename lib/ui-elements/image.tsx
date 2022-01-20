import { useMemo } from 'react'
import FastImage from 'react-native-fast-image'
import type { FastImageProps } from 'react-native-fast-image'
import type { ImageSource } from '@ui-elements/types'

export type UIImageProps = {
  height?: number
  source: ImageSource
  width?: number
} & FastImageProps

const UIImage = ({
  height,
  resizeMode,
  source: propsSource,
  style,
  width,
  ...otherProps
}: UIImageProps) => {
  const source = useMemo(
    () =>
      typeof propsSource === 'string'
        ? {
            uri: propsSource,
          }
        : propsSource,
    [propsSource],
  )

  const styles = useMemo(() => {
    const imageStyle = {
      height,
      width,
    }

    if (Array.isArray(style)) {
      return [imageStyle, ...style]
    }

    return [imageStyle, style]
  }, [height, style, width])

  return (
    <FastImage
      resizeMode={FastImage.resizeMode[resizeMode]}
      style={styles}
      source={source}
      {...otherProps}
    />
  )
}

UIImage.defaultProps = {
  height: undefined,
  resizeMode: 'contain',
  style: undefined,
  width: undefined,
}

export default UIImage
