import { useMemo } from 'react'
import FastImage from 'react-native-fast-image'

const UIImage = ({
  height,
  resizeMode = 'contain',
  source: propsSource,
  style,
  width,
  ...otherProps
}) => {
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

    return {
      imageStyle,
      ...style,
    }
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

export default UIImage
