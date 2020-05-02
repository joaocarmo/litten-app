/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const NewScreen: () => React$Node = () => (
  <View style={styles.container}>
    <Text>New!</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default NewScreen
