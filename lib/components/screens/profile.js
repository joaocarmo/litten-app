/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import Profile from 'screens/profile/index'
import About from 'screens/profile/about'
import WebView from 'screens/profile/webview'
import { translate } from 'utils/i18n'
import {
  SCREEN_PROFILE_INDEX,
  SCREEN_PROFILE_ABOUT,
  SCREEN_PROFILE_WEBVIEW,
} from 'utils/constants'

const ProfileStack = createStackNavigator()

const ProfileAbout: () => React$Node = () => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate withGoBack>
        {translate('screens.profile.about')}
      </ScreenSimpleHeaderTemplate>
    }>
    <About />
  </ScreenTemplate>
)

const ProfileWebView: () => React$Node = ({ route }) => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate withGoBack>
        {route?.params?.title}
      </ScreenSimpleHeaderTemplate>
    }
    scrollable={false}>
    <WebView path={route?.params?.path} />
  </ScreenTemplate>
)

const NewScreen: () => React$Node = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name={SCREEN_PROFILE_INDEX} component={Profile} />
    <ProfileStack.Screen name={SCREEN_PROFILE_ABOUT} component={ProfileAbout} />
    <ProfileStack.Screen
      name={SCREEN_PROFILE_WEBVIEW}
      component={ProfileWebView}
    />
  </ProfileStack.Navigator>
)

export default NewScreen
