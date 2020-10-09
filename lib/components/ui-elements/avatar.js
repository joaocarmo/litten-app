/**
 * @format
 * @flow
 */

import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

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
    <View
      {...otherProps}
      style={[
        StyleSheet.compose(styles.uiAvatarContainer, containerStyle),
        getSize(),
      ]}>
      {source && (
        <Image
          source={source}
          style={[styles.uiAvatarImage, getSize()]}
          resizeMode="contain"
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  uiAvatarContainer: {},
  uiAvatarImage: {
    overflow: 'hidden',
  },
  uiAvatarSizeMini: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
})

export default UIAvatar
