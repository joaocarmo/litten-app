/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const HomeScreen: () => React$Node = () => (
  <View style={styles.container}>
    <Text>Home!</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default HomeScreen
