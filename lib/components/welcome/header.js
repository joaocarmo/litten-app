/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { logoBlue } from 'images'

const Header: () => React$Node = () => (
  <View style={styles.header}>
    <Image source={logoBlue} style={styles.logo} resizeMode="contain" />
  </View>
)

const styles = StyleSheet.create({
  header: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 32,
    width: 115,
  },
})

export default Header
