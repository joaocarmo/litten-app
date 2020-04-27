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
  disabled = false,
  onPress,
  secondary,
  style,
  textStyle,
  ...otherProps
}) => (
  <TouchableOpacity
    {...otherProps}
    onPress={disabled ? null : onPress}
    style={StyleSheet.compose(
      secondary
        ? disabled
          ? secondaryDisabledStyle
          : secondaryStyle
        : disabled
        ? primaryDisabledStyle
        : primaryStyle,
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
  disabled: {
    opacity: 0.3,
  },
})

const primaryStyle = styles.uiButton
const primaryDisabledStyle = StyleSheet.compose(primaryStyle, styles.disabled)
const secondaryStyle = StyleSheet.compose(primaryStyle, styles.secondary)
const secondaryDisabledStyle = StyleSheet.compose(
  secondaryStyle,
  styles.disabled,
)

export default UIButton
