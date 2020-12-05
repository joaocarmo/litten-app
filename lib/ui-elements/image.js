/**
 * @format
 * @flow
 */

import { Image } from 'react-native'

const UIImage: (args: any) => React$Node = ({
  heigth,
  noCache = false,
  progressiveRenderingEnabled = true,
  resizeMode = 'contain',
  source,
  width,
  ...otherProps
}) => {
  const getSource = () => {
    if (!noCache && typeof source === 'object' && source.uri) {
      return {
        ...source,
        cache: 'force-cache',
        heigth,
        width,
      }
    }
    return source
  }

  return (
    <Image
      source={getSource()}
      resizeMode={resizeMode}
      progressiveRenderingEnabled={progressiveRenderingEnabled}
      {...otherProps}
    />
  )
}

export default UIImage
