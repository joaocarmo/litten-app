/**
 * @format
 * @flow strict-local
 */

import auth from '@react-native-firebase/auth'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'
import { UIActionSheet, UIListItem, UIText } from 'ui-elements'
import { translate } from 'utils/i18n'
import {
  SCREEN_PROFILE_ABOUT,
  SCREEN_TAB_NAV_NEW,
  SCREEN_PROFILE_WEBVIEW,
  SCREEN_DEV_STORYBOOK,
  WEB_APP_HELP_AND_CONTACT,
  WEB_APP_TERMS_AND_CONDITIONS,
  WEB_APP_PRIVACY_POLICY,
} from 'utils/constants'

// Temporary placeholders
const activePosts = 2
const pastPosts = 1

const ProfileMainScreen: () => React$Node = () => {
  const navigation = useNavigation()

  const signout = async () => await auth().signOut()

  const showActionSheetFeedback = () => {
    UIActionSheet(
      {
        options: [
          translate('cta.cancel'),
          translate('screens.profile.contactUsAbuse'),
          translate('screens.profile.contactUsBroken'),
          translate('screens.profile.contactUsFeedback'),
        ],
        destructiveButtonIndex: null,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          // TODO
        } else if (buttonIndex === 2) {
          // TODO
        }
      },
    )
  }

  const signoutConfirm = () => {
    Alert.alert(
      translate('cta.signOut'),
      translate('feedback.confirmMessages.signOut'),
      [
        {
          text: translate('cta.yes'),
          onPress: () => signout(),
          style: 'destructive',
        },
        {
          text: translate('cta.no'),
          onPress: () => null,
        },
        { cancelable: false },
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
      <UIListItem
        onPress={() =>
          navigation.navigate(SCREEN_PROFILE_WEBVIEW, {
            title: translate('screens.profile.help'),
            path: WEB_APP_HELP_AND_CONTACT,
          })
        }
        hasExtra>
        {translate('screens.profile.help')}
      </UIListItem>
      <UIListItem onPress={showActionSheetFeedback} hasExtra>
        {translate('screens.profile.contactUs')}
      </UIListItem>
      <UIListItem
        onPress={() =>
          navigation.navigate(SCREEN_PROFILE_WEBVIEW, {
            title: translate('screens.profile.termsAndConditions'),
            path: WEB_APP_TERMS_AND_CONDITIONS,
          })
        }
        hasExtra>
        {translate('screens.profile.termsAndConditions')}
      </UIListItem>
      <UIListItem
        onPress={() =>
          navigation.navigate(SCREEN_PROFILE_WEBVIEW, {
            title: translate('screens.profile.privacyPolicy'),
            path: WEB_APP_PRIVACY_POLICY,
          })
        }
        hasExtra>
        {translate('screens.profile.privacyPolicy')}
      </UIListItem>
      <UIListItem
        onPress={() => navigation.navigate(SCREEN_PROFILE_ABOUT)}
        hasExtra>
        {translate('screens.profile.about')}
      </UIListItem>
      {__DEV__ && (
        <UIListItem
          onPress={() => navigation.navigate(SCREEN_DEV_STORYBOOK)}
          hasExtra>
          {translate('screens.dev.storybook')}
        </UIListItem>
      )}
      <UIListItem onPress={signoutConfirm}>
        {translate('cta.signOut')}
      </UIListItem>
    </>
  )
}

export default ProfileMainScreen
