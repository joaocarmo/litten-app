/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { UIButton } from 'ui-elements'
import colors from 'styles/colors'
import { iconCamera } from 'images'

const StepPhoto: () => React$Node = () => (
  <View style={styles.container}>
    <View style={styles.box}>
      <Image source={iconCamera} style={styles.icon} />
      <Text style={styles.text}>
        Take a profile picture{'\n'}
        or
      </Text>
      <UIButton secondary style={styles.button}>
        From library
      </UIButton>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  box: {
    height: 180,
    width: 330,
    borderColor: colors.borderColor,
    borderWidth: 2.5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 42,
    width: 46,
    margin: 5,
  },
  text: {
    color: colors.darkGray,
    fontSize: 16,
    fontWeight: '600',
    margin: 5,
    textAlign: 'center',
  },
  button: {
    width: 140,
    height: 32,
  },
})

export default StepPhoto
