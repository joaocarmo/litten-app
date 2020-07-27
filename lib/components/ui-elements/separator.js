/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, View } from 'react-native'
import colors from 'styles/colors'

const UISeparator: () => React$Node = ({ style, ...otherProps }) => (
  <View {...otherProps} style={StyleSheet.compose(styles.uiSeparator, style)} />
)

const styles = StyleSheet.create({
  uiSeparator: {
    height: 1,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: colors.gray,
  },
})

export default UISeparator
