import { useCallback, useMemo, useState } from 'react'
import FastImage from 'react-native-fast-image'
import UILoader from '@ui-elements/loader'
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
  const [isLoading, setIsLoading] = useState(true)

  const source = useMemo(
    () =>
      typeof propsSource === 'string'
        ? {
            uri: propsSource,
          }
        : propsSource,
    [propsSource],
  )

  const handleOnLoadStart = useCallback(() => {
    setIsLoading(true)
  }, [])

  const handleOnLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

  const styles = useMemo(() => {
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
        source={source}
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
