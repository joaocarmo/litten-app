/**
 * @format
 * @flow strict-local
 */

import auth from '@react-native-firebase/auth'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'
import { UIListItem, UIText } from 'ui-elements'
import { translate } from 'utils/i18n'
import { SCREEN_TAB_NAV_NEW } from 'utils/constants'

// Temporary placeholders
const activePosts = 2
const pastPosts = 1

const ProfileMainScreen: () => React$Node = () => {
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
    <>
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
      <UIListItem hasExtra>{translate('screens.profile.about')}</UIListItem>
      <UIListItem onPress={signoutConfirm}>
        {translate('cta.signOut')}
      </UIListItem>
    </>
  )
}

export default ProfileMainScreen
