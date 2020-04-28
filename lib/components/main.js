/**
 * @format
 * @flow strict-local
 */

import auth from '@react-native-firebase/auth'
import { connect } from 'react-redux'
import React from 'react'
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { UILink } from 'ui-elements'
import colors from 'styles/colors'

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticatedUser,
})

const mapDispatchToProps = () => ({})

const Main: () => React$Node = ({
  authenticatedUser: { basic: { displayName = 'User', photoURL = null } = {} },
}) => {
  const logout = async () => {
    await auth().signOut()
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        {photoURL && <Image source={{ uri: photoURL }} style={styles.image} />}
        <Text style={styles.text}>Welcome, {displayName} !</Text>
        <UILink underline={false} onPress={logout} style={styles.link}>
          Sign out
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
  image: {
    height: 128,
    width: 128,
    borderRadius: 64,
    borderWidth: 2,
    margin: 20,
  },
  text: {
    fontSize: 20,
    margin: 20,
  },
  link: {
    fontSize: 20,
    margin: 20,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
