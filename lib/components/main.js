/**
 * @format
 * @flow
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigation from 'structure/tab-navigation'
import FavouritesScreen from 'screens/favourites'
import HomeScreen from 'screens/home'
import LittenPostScreen from 'screens/litten/post'
import MessagesScreen from 'screens/messages'
import NewScreen from 'screens/new'
import PrivateMessagesScreen from 'screens/messages/private-messages-screen'
import ProfileScreen from 'screens/profile'
import SelectLocation from 'screens/select-location'
import UserProfileScreen from 'screens/profile/view'
import {
  Favourites,
  Home,
  Messages,
  New,
  Profile,
} from 'images/components/menu'
import {
  SCREEN_LITTEN_POST,
  SCREEN_MESSAGE_PRIVATE,
  SCREEN_NEW_LOCATION,
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
      tabBarIcon: Home,
      tabBarAccessibilityLabel: translate('accessibility.tabBar.home'),
    },
  },
  {
    key: SCREEN_TAB_NAV_FAVOURITES,
    name: SCREEN_TAB_NAV_FAVOURITES,
    component: FavouritesScreen,
    options: {
      tabBarIcon: Favourites,
      tabBarAccessibilityLabel: translate('accessibility.tabBar.favourites'),
    },
  },
  {
    key: SCREEN_TAB_NAV_NEW,
    name: SCREEN_TAB_NAV_NEW,
    component: NewScreen,
    options: {
      tabBarIcon: New,
      tabBarAccessibilityLabel: translate('accessibility.tabBar.newPost'),
    },
  },
  {
    key: SCREEN_TAB_NAV_MESSAGES,
    name: SCREEN_TAB_NAV_MESSAGES,
    component: MessagesScreen,
    options: {
      tabBarIcon: Messages,
      tabBarBadge: 0,
      tabBarAccessibilityLabel: translate('accessibility.tabBar.messages'),
    },
  },
  {
    key: SCREEN_TAB_NAV_PROFILE,
    name: SCREEN_TAB_NAV_PROFILE,
    component: ProfileScreen,
    options: {
      tabBarIcon: Profile,
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
  {
    key: SCREEN_NEW_LOCATION,
    name: SCREEN_NEW_LOCATION,
    component: SelectLocation,
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
