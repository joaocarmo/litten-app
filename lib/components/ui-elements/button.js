/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import colors from 'styles/colors'

const UIButton: () => React$Node = ({
  children,
  secondary,
  style,
  textStyle,
  ...otherProps
}) => (
  <TouchableOpacity
    {...otherProps}
    style={StyleSheet.compose(
      secondary ? secondaryStyle : primaryStyle,
      style,
    )}>
    <Text style={StyleSheet.compose(styles.uiButtonText, textStyle)}>
      {children}
    </Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  uiButton: {
    height: 40,
    width: vw(77),
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.purple,
  },
  uiButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  secondary: {
    backgroundColor: colors.blue,
  },
})

const primaryStyle = styles.uiButton
const secondaryStyle = StyleSheet.compose(primaryStyle, styles.secondary)

export default UIButton
