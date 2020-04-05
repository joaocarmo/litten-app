/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import stepOne from '../../images/step-one.png'

const Carousel: () => React$Node = () => (
  <View style={styles.carousel}>
    <Text style={styles.text}>Welcome to our app !</Text>
    <Image source={stepOne} style={styles.image} />
  </View>
)

const styles = StyleSheet.create({
  carousel: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '100',
    marginBottom: 60,
  },
  image: {
    width: 320,
  },
})

export default Carousel
