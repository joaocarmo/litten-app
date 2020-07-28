/**
 * @format
 * @flow
 */

import React from 'react'
import { StyleSheet, View } from 'react-native'

const UIContainer: () => React$Node = ({ children, style, ...otherProps }) => (
  <View {...otherProps} style={StyleSheet.compose(styles.uiContainer, style)}>
    {children}
  </View>
)

const styles = StyleSheet.create({
  uiContainer: {
    width: '75%',
  },
})

export default UIContainer
