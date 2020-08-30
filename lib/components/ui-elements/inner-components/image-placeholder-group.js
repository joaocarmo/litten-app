/**
 * @format
 * @flow
 */

import React from 'react'
import { StyleSheet, View } from 'react-native'

const UIImagePlaceholderGroup: (args: any) => React$Node = ({
  children,
  style,
  ...otherProps
}) => (
  <View
    {...otherProps}
    style={StyleSheet.compose(styles.groupContainer, style)}>
    {children}
    <View style={styles.lastRowFiller} />
  </View>
)

const styles = StyleSheet.create({
  groupContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: -3,
  },
  lastRowFiller: {
    flex: 1,
  },
})

export default UIImagePlaceholderGroup
