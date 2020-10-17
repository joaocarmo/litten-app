/**
 * @format
 * @flow
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigation from 'structure/tab-navigation'
import HomeScreen from 'screens/home'
import FavouritesScreen from 'screens/favourites'
import NewScreen from 'screens/new'
import MessagesScreen from 'screens/messages'
import PrivateMessagesScreen from 'screens/messages/private-messages-screen'
import LittenPostScreen from 'screens/litten/post'
import ProfileScreen from 'screens/profile'
import UserProfileScreen from 'screens/profile/view'
import {
  menuFavourites,
  menuHome,
  menuMessages,
  menuNew,
  menuProfile,
} from 'images'
import {
  SCREEN_LITTEN_POST,
  SCREEN_MESSAGE_PRIVATE,
  SCREEN_TAB_NAV_FAVOURITES,
  SCREEN_TAB_NAV_HOME,
  SCREEN_TAB_NAV_MESSAGES,
  SCREEN_TAB_NAV_NEW,
  SCREEN_TAB_NAV_PROFILE,
  SCREEN_USER_PROFILE,
} from 'utils/constants'
import { translate } from 'utils/i18n'

const tabScreens = [
  {
    key: SCREEN_TAB_NAV_HOME,
    name: SCREEN_TAB_NAV_HOME,
    component: HomeScreen,
    options: {
      tabBarIcon: menuHome,
      tabBarAccessibilityLabel: translate('accessibility.tabBar.home'),
    },
  },
  {
    key: SCREEN_TAB_NAV_FAVOURITES,
    name: SCREEN_TAB_NAV_FAVOURITES,
    component: FavouritesScreen,
    options: {
      tabBarIcon: menuFavourites,
      tabBarAccessibilityLabel: translate('accessibility.tabBar.favourites'),
    },
  },
  {
    key: SCREEN_TAB_NAV_NEW,
    name: SCREEN_TAB_NAV_NEW,
    component: NewScreen,
    options: {
      tabBarIcon: menuNew,
      tabBarAccessibilityLabel: translate('accessibility.tabBar.newPost'),
    },
  },
  {
    key: SCREEN_TAB_NAV_MESSAGES,
    name: SCREEN_TAB_NAV_MESSAGES,
    component: MessagesScreen,
    options: {
      tabBarIcon: menuMessages,
      tabBarAccessibilityLabel: translate('accessibility.tabBar.messages'),
    },
  },
  {
    key: SCREEN_TAB_NAV_PROFILE,
    name: SCREEN_TAB_NAV_PROFILE,
    component: ProfileScreen,
    options: {
      tabBarIcon: menuProfile,
      tabBarAccessibilityLabel: translate('accessibility.tabBar.profile'),
    },
  },
]

const Tab = createBottomTabNavigator()

const TabNavigator: (args: any) => React$Node = () => (
  <Tab.Navigator tabBar={(props) => <TabNavigation {...props} />}>
    {tabScreens.map((props) => (
      <Tab.Screen {...props} />
    ))}
  </Tab.Navigator>
)

const stackScreens = [
  {
    key: SCREEN_TAB_NAV_HOME,
    name: SCREEN_TAB_NAV_HOME,
    component: TabNavigator,
  },
  {
    key: SCREEN_MESSAGE_PRIVATE,
    name: SCREEN_MESSAGE_PRIVATE,
    component: PrivateMessagesScreen,
  },
  {
    key: SCREEN_LITTEN_POST,
    name: SCREEN_LITTEN_POST,
    component: LittenPostScreen,
  },
  {
    key: SCREEN_USER_PROFILE,
    name: SCREEN_USER_PROFILE,
    component: UserProfileScreen,
  },
]

const Stack = createStackNavigator()

const Main: (args: any) => React$Node = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {stackScreens.map((props) => (
      <Stack.Screen {...props} />
    ))}
  </Stack.Navigator>
)

export default Main
