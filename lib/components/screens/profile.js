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
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: photoURL }}
            style={styles.avatar}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.headerText}>{displayName}</Text>
        <Text style={StyleSheet.compose(styles.headerText, styles.headerRight)}>
          {translate('screens.profile.edit')}
        </Text>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
