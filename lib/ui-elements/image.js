/**
 * @format
 * @flow
 */

import FastImage from 'react-native-fast-image'

const UIImage: (args: any) => React$Node = ({
  heigth,
  resizeMode = 'contain',
  source,
  width,
  ...otherProps
}) => (
  <FastImage
    source={source}
    resizeMode={FastImage.resizeMode[resizeMode]}
    {...otherProps}
  />
)

export default UIImage
