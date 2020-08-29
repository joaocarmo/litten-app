/**
 * @format
 * @flow
 */

import React from 'react'
import { StyleSheet, Text } from 'react-native'
import colors from 'styles/colors'

const UIHeader: (args: any) => React$Node = ({
  children,
  style,
  ...otherProps
}) => (
  <Text
    {...(otherProps: any)}
    style={StyleSheet.compose(styles.uiHeader, style)}>
    {children}
  </Text>
)

const styles = StyleSheet.create({
  uiHeader: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.black,
    paddingTop: 2,
    paddingBottom: 2,
    marginTop: 2,
    marginBottom: 2,
  },
})

export default UIHeader
