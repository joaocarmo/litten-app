/**
 * @format
 * @flow
 */

import { Image } from 'react-native'

const UIImage: (args: any) => React$Node = ({
  noCache = false,
  resizeMode = 'contain',
  source,
  ...otherProps
}) => {
  const getSource = () => {
    if (!noCache && typeof source === 'object' && source.uri) {
      return {
        ...source,
        cache: 'force-cache',
      }
    }
    return source
  }

  return <Image source={getSource()} resizeMode={resizeMode} {...otherProps} />
}

export default UIImage
