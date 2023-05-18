import { useCallback, useMemo, useState } from 'react'
import type { StyleProp } from 'react-native'
import FastImage from 'react-native-fast-image'
import type {
  FastImageProps,
  ImageStyle,
  ResizeMode,
  Source,
} from 'react-native-fast-image'
import UILoader from '@ui-elements/loader'
import type { ImageSource } from '@ui-elements/types'

export interface UIImageProps extends Omit<FastImageProps, 'source'> {
  height?: number
  resizeMode?: ResizeMode
  source: ImageSource
  style?: StyleProp<ImageStyle>
  width?: number
}

const UIImage = ({
  height,
  resizeMode,
  source: propsSource,
  style,
  width,
  ...otherProps
}: UIImageProps) => {
  const [isLoading, setIsLoading] = useState(true)

  const source = useMemo<ImageSource>(() => {
    if (typeof propsSource === 'string') {
      return { uri: propsSource }
    }

    return propsSource
  }, [propsSource])

  const handleOnLoadStart = useCallback(() => {
    setIsLoading(true)
  }, [])

  const handleOnLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

  const styles = useMemo<StyleProp<ImageStyle>>(() => {
    if (!height && !width) {
      return style
    }

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
    <>
      {isLoading && <UILoader active={isLoading} size="small" />}
      <FastImage
        source={source as Source}
        resizeMode={FastImage.resizeMode[resizeMode]}
        style={styles}
        onLoadStart={handleOnLoadStart}
        onLoadEnd={handleOnLoad}
        {...otherProps}
      />
    </>
  )
}

UIImage.defaultProps = {
  height: undefined,
  resizeMode: 'contain',
  style: undefined,
  width: undefined,
}

export default UIImage
