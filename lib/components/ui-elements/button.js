/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
}) => {
  const getStyle = () => {
    if (secondary) {
      if (disabled) {
        return secondaryDisabledStyle
      }
      return secondaryStyle
    }
    if (disabled) {
      return primaryDisabledStyle
    }
    return primaryStyle
  }

  return (
    <TouchableOpacity {...otherProps} onPress={disabled ? null : onPress}>
      <View style={StyleSheet.compose(getStyle(), style)}>
        <Text style={StyleSheet.compose(styles.uiButtonText, textStyle)}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

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