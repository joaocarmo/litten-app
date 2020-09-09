/**
 * @format
 * @flow
 */

import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigation from 'structure/tab-navigation'
import HomeScreen from 'screens/home'
import FavouritesScreen from 'screens/favourites'
import NewScreen from 'screens/new'
import MessagesScreen from 'screens/messages'
import PrivateMessagesScreen from 'screens/messages/private-messages-screen'
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
  SCREEN_TAB_NAV_FAVOURITES,
  SCREEN_TAB_NAV_HOME,
  SCREEN_TAB_NAV_MESSAGES,
  SCREEN_TAB_NAV_NEW,
  SCREEN_TAB_NAV_PROFILE,
  SCREEN_MESSAGE_PRIVATE,
  SCREEN_USER_PROFILE,
} from 'utils/constants'

const screenItems = [
  {
    key: 'home',
    name: SCREEN_TAB_NAV_HOME,
    component: HomeScreen,
    tabBarIcon: menuHome,
    tabBarAccessibilityLabel: 'Home',
  },
  {
    key: 'fav',
    name: SCREEN_TAB_NAV_FAVOURITES,
    component: FavouritesScreen,
    tabBarIcon: menuFavourites,
    tabBarAccessibilityLabel: 'Favourites',
  },
  {
    key: 'new',
    name: SCREEN_TAB_NAV_NEW,
    component: NewScreen,
    tabBarIcon: menuNew,
    tabBarAccessibilityLabel: 'New Post',
  },
  {
    key: 'messages',
    name: SCREEN_TAB_NAV_MESSAGES,
    component: MessagesScreen,
    tabBarIcon: menuMessages,
    tabBarAccessibilityLabel: 'Messages',
  },
  {
    key: 'profile',
    name: SCREEN_TAB_NAV_PROFILE,
    component: ProfileScreen,
    tabBarIcon: menuProfile,
    tabBarAccessibilityLabel: 'Profile',
  },
]

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const TabNavigator: (args: any) => React$Node = () => (
  <Tab.Navigator tabBar={(props) => <TabNavigation {...props} />}>
    {screenItems.map(
      ({ key, name, component, tabBarIcon, tabBarAccessibilityLabel }) => (
        <Tab.Screen
          key={key}
          name={name}
          component={component}
          options={{ tabBarIcon, tabBarAccessibilityLabel }}
        />
      ),
    )}
  </Tab.Navigator>
)

const Main: (args: any) => React$Node = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={SCREEN_TAB_NAV_HOME} component={TabNavigator} />
    <Stack.Screen
      name={SCREEN_MESSAGE_PRIVATE}
      component={PrivateMessagesScreen}
    />
    <Stack.Screen name={SCREEN_USER_PROFILE} component={UserProfileScreen} />
  </Stack.Navigator>
)

export default Main
