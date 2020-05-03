/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, Text } from 'react-native'
import colors from 'styles/colors'

const UIText: () => React$Node = ({ children, style, ...otherProps }) => (
  <Text {...otherProps} style={StyleSheet.compose(styles.uiText, style)}>
    {children}
  </Text>
)

const styles = StyleSheet.create({
  uiText: {
    color: colors.black,
    paddingTop: 6,
    paddingBottom: 6,
    marginTop: 8,
    marginBottom: 8,
  },
})

export default UIText
