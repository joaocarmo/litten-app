import { createStackNavigator } from '@react-navigation/stack'
import StackTemplate from '@templates/stack'
import Profile from '@screens/profile/start'
import About from '@screens/profile/about'
import Edit from '@screens/profile/edit'
import Posts from '@screens/profile/posts'
import Report from '@screens/profile/report'
import Settings from '@screens/profile/settings'
import WebView from '@screens/profile/webview'
import DevHacks from '@screens/dev/hacks'
import { translate } from '@utils/i18n'
import { Routes } from '@utils/constants'
import type { ProfileStackParamList } from '@utils/types/routes'

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
    }
  >
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
    key: Routes.SCREEN_PROFILE_INDEX,
    name: Routes.SCREEN_PROFILE_INDEX,
    component: Profile,
  },
  {
    key: Routes.SCREEN_PROFILE_EDIT,
    name: Routes.SCREEN_PROFILE_EDIT,
    component: EditScreen,
  },
  {
    key: Routes.SCREEN_PROFILE_POSTS,
    name: Routes.SCREEN_PROFILE_POSTS,
    component: PostsScreen,
  },
  {
    key: Routes.SCREEN_PROFILE_SETTINGS,
    name: Routes.SCREEN_PROFILE_SETTINGS,
    component: SettingsScreen,
  },
  {
    key: Routes.SCREEN_PROFILE_REPORT,
    name: Routes.SCREEN_PROFILE_REPORT,
    component: ReportScreen,
  },
  {
    key: Routes.SCREEN_PROFILE_WEBVIEW,
    name: Routes.SCREEN_PROFILE_WEBVIEW,
    component: WebViewScreen,
  },
  {
    key: Routes.SCREEN_PROFILE_ABOUT,
    name: Routes.SCREEN_PROFILE_ABOUT,
    component: AboutScreen,
  },
  {
    key: Routes.SCREEN_DEV_HACKS,
    name: Routes.SCREEN_DEV_HACKS,
    component: DevHacks,
  },
] as const

const ProfileStack = createStackNavigator<ProfileStackParamList>()

const ProfileScreen = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    {stackScreens.map(({ key, name, component }) => (
      <ProfileStack.Screen key={key} name={name} component={component} />
    ))}
  </ProfileStack.Navigator>
)

export default ProfileScreen
