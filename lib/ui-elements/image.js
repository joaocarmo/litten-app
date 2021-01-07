/**
 * @format
 * @flow
 */

import FastImage from 'react-native-fast-image'

const UIImage: (args: any) => React$Node = ({
  height,
  resizeMode = 'contain',
  style,
  width,
  ...otherProps
}) => {
  const getStyle = () => {
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
  }

  return (
    <FastImage
      resizeMode={FastImage.resizeMode[resizeMode]}
      style={getStyle()}
      {...otherProps}
    />
  )
}

export default UIImage
