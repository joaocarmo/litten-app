/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '../../styles/colors'

const Actions: () => React$Node = () => {
  const navigation = useNavigation()

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={styles.button}>
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
      <View style={styles.second}>
        <Text style={styles.secondText}>Already have an account? </Text>
        <Text
          onPress={() => navigation.navigate('Login')}
          style={styles.secondLink}>
          Sign in
        </Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 320,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.purple,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  second: {
    flexDirection: 'row',
    marginTop: 24,
  },
  secondText: {},
  secondLink: {
    color: colors.blue,
    textDecorationLine: 'underline',
  },
})

export default Actions
