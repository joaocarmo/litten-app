/**
 * @format
 * @flow strict-local
 */

import auth from '@react-native-firebase/auth'
import { connect } from 'react-redux'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import { UIListItem, UIText } from 'ui-elements'
import ScreenTemplate from 'templates/screen'
import { translate } from 'utils/i18n'
import { SCREEN_TAB_NAV_NEW } from 'utils/constants'
import colors from 'styles/colors'

const avatarSize = 36

// Temporary placeholders
const activePosts = 2
const pastPosts = 1

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticatedUser,
})

const mapDispatchToProps = () => ({})

const ProfileScreen: () => React$Node = ({
  authenticatedUser: { basic: { displayName = 'User', photoURL = null } = {} },
}) => {
  const navigation = useNavigation()

  const signout = async () => await auth().signOut()

  const signoutConfirm = () => {
    Alert.alert(
      translate('cta.signOut'),
      translate('feedback.confirmMessages.signOut'),
      [
        {
          text: translate('cta.yes'),
          onPress: () => signout(),
        },
        {
          text: translate('cta.no'),
          onPress: () => null,
        },
      ],
    )
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
            {translate('screens.profile.edit')}
          </Text>
        </View>
      }>
      <UIText>{translate('screens.profile.firstHeader')}</UIText>
      <UIListItem onPress={() => navigation.navigate(SCREEN_TAB_NAV_NEW)}>
        {translate('screens.profile.newPost')}
      </UIListItem>
      <UIListItem badgeNum={activePosts} badgeActive={activePosts > 0} hasExtra>
        {translate('screens.profile.activePosts')}
      </UIListItem>
      <UIListItem badgeNum={pastPosts} hasExtra>
        {translate('screens.profile.pastPosts')}
      </UIListItem>
      <UIText>{translate('screens.profile.secondHeader')}</UIText>
      <UIListItem hasExtra>
        {translate('screens.profile.definitions')}
      </UIListItem>
      <UIListItem hasExtra>{translate('screens.profile.help')}</UIListItem>
      <UIListItem hasExtra>{translate('screens.profile.contactUs')}</UIListItem>
      <UIListItem hasExtra>
        {translate('screens.profile.termsAndConditions')}
      </UIListItem>
      <UIListItem hasExtra>
        {translate('screens.profile.privacyPolicy')}
      </UIListItem>
      <UIListItem onPress={signoutConfirm}>
        {translate('cta.signOut')}
      </UIListItem>
    </ScreenTemplate>
  )
}

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
  link: {
    display: 'none',
    fontSize: 24,
    marginTop: 20,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
