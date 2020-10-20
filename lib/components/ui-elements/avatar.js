/**
 * @format
 * @flow
 */

import { StyleSheet, View } from 'react-native'
import UIImage from './image'
import { USER_AVATAR_SIZE_MINI } from 'utils/constants'

const UIAvatar: (args: any) => React$Node = ({
  containerStyle,
  size,
  source,
  ...otherProps
}) => {
  const getSize = () => {
    switch (size) {
      default:
        return styles.uiAvatarSizeMini
    }
  }

  return (
    <View {...otherProps} style={[containerStyle, getSize()]}>
      {source && (
        <UIImage source={source} style={[styles.uiAvatarImage, getSize()]} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  uiAvatarImage: {
    overflow: 'hidden',
  },
  uiAvatarSizeMini: {
    height: USER_AVATAR_SIZE_MINI,
    width: USER_AVATAR_SIZE_MINI,
    borderRadius: USER_AVATAR_SIZE_MINI / 2,
  },
})

export default UIAvatar
