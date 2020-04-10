/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, Text } from 'react-native'
import colors from '../../styles/colors'

const UILink: () => React$Node = ({ children, style, ...otherProps }) => (
  <Text {...otherProps} style={StyleSheet.compose(styles.uiLink, style)}>
    {children}
  </Text>
)

const styles = StyleSheet.create({
  uiLink: {
    color: colors.blue,
    textDecorationLine: 'underline',
  },
})

export default UILink
