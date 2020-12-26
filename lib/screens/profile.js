/**
 * @format
 * @flow
 */

import { createStackNavigator } from '@react-navigation/stack'
import StackTemplate from 'templates/stack'
import Profile from 'screens/profile/index'
import About from 'screens/profile/about'
import Edit from 'screens/profile/edit'
import Posts from 'screens/profile/posts'
import Report from 'screens/profile/report'
import Settings from 'screens/profile/settings'
import WebView from 'screens/profile/webview'
import DevHacks from 'screens/dev/hacks'
import { translate } from 'utils/i18n'
import {
  SCREEN_DEV_HACKS,
  SCREEN_PROFILE_ABOUT,
  SCREEN_PROFILE_EDIT,
  SCREEN_PROFILE_INDEX,
  SCREEN_PROFILE_POSTS,
  SCREEN_PROFILE_REPORT,
  SCREEN_PROFILE_SETTINGS,
  SCREEN_PROFILE_WEBVIEW,
} from 'utils/constants'

const EditScreen = () => (
  <StackTemplate header={translate('screens.profile.edit')} scrollable>
    <Edit />
  </StackTemplate>
)

const PostsScreen = ({ route }) => (
  <StackTemplate
    header={
      route?.params?.active
        ? translate('screens.profile.activePosts')
        : translate('screens.profile.pastPosts')
    }>
    <Posts active={route?.params?.active} />
  </StackTemplate>
)

const SettingsScreen = () => (
  <StackTemplate header={translate('screens.profile.settings')}>
    <Settings />
  </StackTemplate>
)

const ReportScreen = ({ route }) => (
  <StackTemplate header={translate('screens.profile.contactUs')} scrollable>
    <Report
      initialContent={route?.params?.initialContent}
      type={route?.params?.type}
    />
  </StackTemplate>
)

const WebViewScreen = ({ route }) => (
  <StackTemplate header={route?.params?.title}>
    <WebView path={route?.params?.path} />
  </StackTemplate>
)

const AboutScreen = () => (
  <StackTemplate header={translate('screens.profile.about')} scrollable>
    <About />
  </StackTemplate>
)

const stackScreens = [
  {
    key: SCREEN_PROFILE_INDEX,
    name: SCREEN_PROFILE_INDEX,
    component: Profile,
  },
  {
    key: SCREEN_PROFILE_EDIT,
    name: SCREEN_PROFILE_EDIT,
    component: EditScreen,
  },
  {
    key: SCREEN_PROFILE_POSTS,
    name: SCREEN_PROFILE_POSTS,
    component: PostsScreen,
  },
  {
    key: SCREEN_PROFILE_SETTINGS,
    name: SCREEN_PROFILE_SETTINGS,
    component: SettingsScreen,
  },
  {
    key: SCREEN_PROFILE_REPORT,
    name: SCREEN_PROFILE_REPORT,
    component: ReportScreen,
  },
  {
    key: SCREEN_PROFILE_WEBVIEW,
    name: SCREEN_PROFILE_WEBVIEW,
    component: WebViewScreen,
  },
  {
    key: SCREEN_PROFILE_ABOUT,
    name: SCREEN_PROFILE_ABOUT,
    component: AboutScreen,
  },
  {
    key: SCREEN_DEV_HACKS,
    name: SCREEN_DEV_HACKS,
    component: DevHacks,
  },
]

const ProfileStack = createStackNavigator()

const ProfileScreen: (args: any) => React$Node = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    {stackScreens.map((props) => (
      <ProfileStack.Screen {...props} />
    ))}
  </ProfileStack.Navigator>
)

export default ProfileScreen
