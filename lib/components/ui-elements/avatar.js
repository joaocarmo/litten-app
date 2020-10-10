/**
 * @format
 * @flow
 */

import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
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

  const getSource = () => {
    if (typeof source === 'object' && source.uri) {
      return {
        ...source,
        cache: 'force-cache',
      }
    }
    return source
  }

  return (
    <View {...otherProps} style={[containerStyle, getSize()]}>
      {source && (
        <Image
          source={getSource()}
          style={[styles.uiAvatarImage, getSize()]}
          resizeMode="contain"
        />
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
