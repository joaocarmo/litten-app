/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'

const Login: () => React$Node = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Login with us you sexy devil!</Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Login
