/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import Header from './welcome/header'
import Intro from './welcome/intro'
import Actions from './welcome/actions'
import colors from 'styles/colors'

const Welcome: () => React$Node = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <Header />
    </View>
    <View style={styles.intro}>
      <Intro />
    </View>
    <View style={styles.actions}>
      <Actions />
    </View>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  intro: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    flex: 1,
    alignItems: 'center',
  },
})

export default Welcome
