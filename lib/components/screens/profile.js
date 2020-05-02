/**
 * @format
 * @flow strict-local
 */

import auth from '@react-native-firebase/auth'
import { connect } from 'react-redux'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import { UILink } from 'ui-elements'
import ScreenTemplate from 'templates/screen'
import colors from 'styles/colors'

const avatarSize = 36

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticatedUser,
})

const mapDispatchToProps = () => ({})

const ProfileScreen: () => React$Node = ({
  authenticatedUser: { basic: { displayName = 'User', photoURL = null } = {} },
}) => {
  const signout = async () => {
    await auth().signOut()
  }

  return (
    <ScreenTemplate
      header={
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: photoURL }}
              style={styles.avatar}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.headerText}>{displayName}</Text>
          <Text
            style={StyleSheet.compose(styles.headerText, styles.headerRight)}>
            Edit
          </Text>
        </View>
      }>
      <Text style={styles.text}>Profile!</Text>
      <UILink underline={false} onPress={signout} style={styles.link}>
        Sign out
      </UILink>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  header: {
    width: vw(90),
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 42,
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
  },
  headerRight: {
    textAlign: 'right',
  },
  avatarContainer: {
    flex: 1,
  },
  avatar: {
    height: avatarSize,
    width: avatarSize,
    borderRadius: avatarSize / 2,
  },
  text: {
    fontSize: 24,
  },
  link: {
    fontSize: 24,
    marginTop: 20,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
