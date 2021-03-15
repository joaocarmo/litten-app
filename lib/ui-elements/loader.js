/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { opacity2Hex } from 'utils/functions'
import { DEVICE_WIDTH } from 'utils/constants'
import colors from 'styles/colors'

const UILoader: (args: any) => Node = ({
  active = false,
  transparent = false,
  containerStyle,
  ...otherProps
}) => {
  if (!active) {
    return null
  }

  const getTransparencyStyle = () => {
    if (transparent === true) {
      return styles.uiLoaderTransparent
    }

    if (Number.isInteger(transparent)) {
      const opacity = opacity2Hex(100 - +transparent)
      return { backgroundColor: `${styles.uiLoader.backgroundColor}${opacity}` }
    }
  }

  return (
    <View style={[styles.uiLoader, containerStyle, getTransparencyStyle()]}>
      <ActivityIndicator
        animating={active}
        color={colors.blue}
        {...otherProps}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  uiLoader: {
    flex: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: '100%',
    width: DEVICE_WIDTH,
    minWidth: '100%',
    top: 0,
    opacity: 1,
    zIndex: 1,
    backgroundColor: colors.lightGray,
  },
  uiLoaderTransparent: {
    backgroundColor: `${colors.lightGray}${opacity2Hex(80)}`,
  },
})

export default UILoader
