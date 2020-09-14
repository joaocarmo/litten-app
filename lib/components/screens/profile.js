/**
 * @format
 * @flow
 */

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import Profile from 'screens/profile/index'
import About from 'screens/profile/about'
import Edit from 'screens/profile/edit'
import Report from 'screens/profile/report'
import Settings from 'screens/profile/settings'
import WebView from 'screens/profile/webview'
import DevStorybook from 'screens/dev/storybook'
import { translate } from 'utils/i18n'
import {
  SCREEN_PROFILE_INDEX,
  SCREEN_PROFILE_EDIT,
  SCREEN_PROFILE_REPORT,
  SCREEN_PROFILE_SETTINGS,
  SCREEN_PROFILE_ABOUT,
  SCREEN_PROFILE_WEBVIEW,
  SCREEN_DEV_STORYBOOK,
} from 'utils/constants'

const ProfileStack = createStackNavigator()

const ProfileAbout: (args: any) => React$Node = () => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate withGoBack>
        {translate('screens.profile.about')}
      </ScreenSimpleHeaderTemplate>
    }>
    <About />
  </ScreenTemplate>
)

const EditSettings: (args: any) => React$Node = () => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate withGoBack>
        {translate('screens.profile.edit')}
      </ScreenSimpleHeaderTemplate>
    }>
    <Edit />
  </ScreenTemplate>
)

const ProfileSettings: (args: any) => React$Node = () => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate withGoBack>
        {translate('screens.profile.settings')}
      </ScreenSimpleHeaderTemplate>
    }>
    <Settings />
  </ScreenTemplate>
)

const ProfileReport: (args: any) => React$Node = ({ route }) => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate withGoBack>
        {translate('screens.profile.contactUs')}
      </ScreenSimpleHeaderTemplate>
    }>
    <Report type={route?.params?.type} />
  </ScreenTemplate>
)

const ProfileWebView: (args: any) => React$Node = ({ route }) => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate withGoBack>
        {route?.params?.title}
      </ScreenSimpleHeaderTemplate>
    }>
    <WebView path={route?.params?.path} />
  </ScreenTemplate>
)

const ProfileScreen: (args: any) => React$Node = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name={SCREEN_PROFILE_INDEX} component={Profile} />
    <ProfileStack.Screen name={SCREEN_PROFILE_EDIT} component={EditSettings} />
    <ProfileStack.Screen
      name={SCREEN_PROFILE_SETTINGS}
      component={ProfileSettings}
    />
    <ProfileStack.Screen
      name={SCREEN_PROFILE_REPORT}
      component={ProfileReport}
    />
    <ProfileStack.Screen
      name={SCREEN_PROFILE_WEBVIEW}
      component={ProfileWebView}
    />
    <ProfileStack.Screen name={SCREEN_PROFILE_ABOUT} component={ProfileAbout} />
    <ProfileStack.Screen name={SCREEN_DEV_STORYBOOK} component={DevStorybook} />
  </ProfileStack.Navigator>
)

export default ProfileScreen
