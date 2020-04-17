/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { iconSuccess } from 'images'
import colors from 'styles/colors'

const StepSuccess: () => React$Node = () => (
  <View style={styles.container}>
    <Image source={iconSuccess} style={styles.image} />
    <Text style={styles.text}>Registration Successful</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 80,
    width: 80,
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.darkGray,
    padding: 10,
  },
})

export default StepSuccess
