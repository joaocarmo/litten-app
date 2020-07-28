/**
 * @format
 * @flow
 */

import React from 'react'
import { StyleSheet, Text } from 'react-native'
import colors from 'styles/colors'

const UILink: () => React$Node = ({
  children,
  underline = true,
  style,
  ...otherProps
}) => (
  <Text
    {...otherProps}
    style={StyleSheet.compose(
      underline ? styles.uiLink : styles.uiLinkNoUnderline,
      style,
    )}>
    {children}
  </Text>
)

const styles = StyleSheet.create({
  uiLink: {
    color: colors.blue,
    textDecorationLine: 'underline',
  },
  uiLinkNoUnderline: {
    color: colors.blue,
    textDecorationLine: 'none',
  },
})

export default UILink
