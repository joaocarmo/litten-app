/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import colors from 'styles/colors'

const ScreenSimpleHeaderTemplate: () => React$Node = ({ children }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>{children}</Text>
  </View>
)

const styles = StyleSheet.create({
  header: {
    width: vw(85),
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'flex-end',
    paddingBottom: 24,
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
  },
})

export default ScreenSimpleHeaderTemplate
