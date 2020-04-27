/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import colors from 'styles/colors'

const Main: () => React$Node = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" />
    <View style={styles.content}>
      <Text>Welcome to the app !</Text>
    </View>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Main
