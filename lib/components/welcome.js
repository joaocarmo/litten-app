/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import Header from './welcome/header'
import Carousel from './welcome/carousel'
import Actions from './welcome/actions'
import colors from '../styles/colors'

const Welcome: () => React$Node = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <Header />
    </View>
    <View style={styles.carousel}>
      <Carousel />
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
    justifyContent: 'flex-end',
    // backgroundColor: 'red',
  },
  carousel: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'green',
  },
  actions: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
})

export default Welcome
