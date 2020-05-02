/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const MessagesScreen: () => React$Node = () => (
  <View style={styles.container}>
    <Text>Messages!</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default MessagesScreen
