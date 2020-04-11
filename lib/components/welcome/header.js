/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, Text } from 'react-native'
import colors from 'styles/colors'

const Header: () => React$Node = () => <Text style={styles.header}>litten</Text>

const styles = StyleSheet.create({
  header: {
    color: colors.black,
    fontSize: 40,
    fontWeight: '100',
  },
})

export default Header
