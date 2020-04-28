/**
 * @format
 * @flow strict-local
 */

import auth from '@react-native-firebase/auth'
import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { UILink } from 'ui-elements'
import colors from 'styles/colors'

const Main: () => React$Node = () => {
  const logout = async () => {
    await auth().signOut()
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <Text>Welcome to the app !</Text>
        <UILink underline={false} onPress={logout}>
          Logout
        </UILink>
      </View>
    </SafeAreaView>
  )
}

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
