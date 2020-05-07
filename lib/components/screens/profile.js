/**
 * @format
 * @flow strict-local
 */

import { connect } from 'react-redux'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import ScreenTemplate from 'templates/screen'
import ProfileMainScreen from 'screens/profile/main'
import { translate } from 'utils/i18n'
import { iconSettings } from 'images'
import colors from 'styles/colors'

const avatarSize = 36

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticatedUser,
})

const mapDispatchToProps = () => ({})

const ProfileScreen: () => React$Node = ({
  authenticatedUser: { basic: { displayName = 'User', photoURL = null } = {} },
}) => (
  <ScreenTemplate
    header={
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: photoURL }}
            style={styles.avatar}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.headerText}>{displayName}</Text>
        <View style={styles.imageContainer}>
          <Image
            source={iconSettings}
            style={styles.editIcon}
            resizeMode="contain"
          />
        </View>
      </View>
    }>
    <ProfileMainScreen />
  </ScreenTemplate>
)

const styles = StyleSheet.create({
  header: {
    width: vw(90),
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
  },
  imageContainer: {
    flex: 1,
  },
  avatar: {
    height: avatarSize,
    width: avatarSize,
    borderRadius: avatarSize / 2,
    alignSelf: 'flex-start',
  },
  editIcon: {
    flex: 1,
    height: 20,
    width: 20,
    alignSelf: 'flex-end',
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
