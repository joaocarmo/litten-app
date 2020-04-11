/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import colors from 'styles/colors'

const UIButton: () => React$Node = ({
  children,
  style,
  textStyle,
  ...otherProps
}) => (
  <TouchableOpacity
    {...otherProps}
    style={StyleSheet.compose(styles.uiButton, style)}>
    <Text style={StyleSheet.compose(styles.uiButtonText, textStyle)}>
      {children}
    </Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  uiButton: {
    height: 40,
    width: 320,
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
  second: {
    flexDirection: 'row',
    marginTop: 24,
  },
  secondText: {},
  secondLink: {
    color: colors.blue,
    textDecorationLine: 'underline',
  },
})

export default UIButton
