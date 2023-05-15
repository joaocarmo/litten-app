import { useEffect, useMemo } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigation from '@structure/tab-navigation'
import FavouritesScreen from '@screens/favourites'
import HomeScreen from '@screens/home'
import LittenPostScreen from '@screens/litten/post'
import LittenPostSharedScreen from '@screens/litten/post-shared'
import MessagesScreen from '@screens/messages'
import NewScreen from '@screens/new'
import PrivateMessagesScreen from '@screens/messages/private-messages-screen'
import ProfileScreen from '@screens/profile'
import SelectLocation from '@screens/select-location'
import UserProfileScreen from '@screens/profile/view'
import ProfileVerificationScreen from '@screens/profile/verification'
import {
  Favourites,
  Home,
  Messages,
  New,
  Profile,
} from '@images/components/menu'
import { useNotifications, useUnreadMessages } from '@hooks'
import { Routes } from '@utils/constants'
import { translate } from '@utils/i18n'
import type { RootStackParamList, RootTabParamList } from '@utils/types/routes'

const Tab = createBottomTabNavigator<RootTabParamList>()

const TabBar = ({ descriptors, navigation, state }) => (
  <TabNavigation
    descriptors={descriptors}
    navigation={navigation}
    state={state}
  />
)

const TabNavigator = () => {
  const unreadMessages = useUnreadMessages()
  const notifications = useNotifications()

  const tabScreens = useMemo(
    () =>
      [
        {
          key: Routes.SCREEN_TAB_NAV_HOME,
          name: Routes.SCREEN_TAB_NAV_HOME,
          component: HomeScreen,
          options: {
            tabBarIcon: Home as BottomTabNavigationOptions['tabBarIcon'],
            tabBarAccessibilityLabel: translate('accessibility.tabBar.home'),
          },
        },
        {
          key: Routes.SCREEN_TAB_NAV_FAVOURITES,
          name: Routes.SCREEN_TAB_NAV_FAVOURITES,
          component: FavouritesScreen,
          options: {
            tabBarIcon: Favourites as BottomTabNavigationOptions['tabBarIcon'],
            tabBarAccessibilityLabel: translate(
              'accessibility.tabBar.favourites',
            ),
          },
        },
        {
          key: Routes.SCREEN_TAB_NAV_NEW,
          name: Routes.SCREEN_TAB_NAV_NEW,
          component: NewScreen,
          options: {
            tabBarIcon: New as BottomTabNavigationOptions['tabBarIcon'],
            tabBarAccessibilityLabel: translate('accessibility.tabBar.newPost'),
          },
        },
        {
          key: Routes.SCREEN_TAB_NAV_MESSAGES,
          name: Routes.SCREEN_TAB_NAV_MESSAGES,
          component: MessagesScreen,
          options: {
            tabBarIcon: Messages as BottomTabNavigationOptions['tabBarIcon'],
            tabBarBadge: unreadMessages,
            tabBarAccessibilityLabel: translate(
              'accessibility.tabBar.messages',
            ),
          },
        },
        {
          key: Routes.SCREEN_TAB_NAV_PROFILE,
          name: Routes.SCREEN_TAB_NAV_PROFILE,
          component: ProfileScreen,
          options: {
            tabBarIcon: Profile as BottomTabNavigationOptions['tabBarIcon'],
            tabBarAccessibilityLabel: translate('accessibility.tabBar.profile'),
          },
        },
      ] as const,
    [unreadMessages],
  )

  useEffect(() => {
    notifications.setApplicationIconBadgeNumber(unreadMessages)
  }, [notifications, unreadMessages])

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={TabBar}
    >
      {tabScreens.map(({ key, name, component, options }) => (
        <Tab.Screen
          key={key}
          name={name}
          component={component}
          options={options}
        />
      ))}
    </Tab.Navigator>
  )
}

const stackScreens = [
  {
    key: Routes.SCREEN_TAB_NAV_INDEX,
    name: Routes.SCREEN_TAB_NAV_INDEX,
    component: TabNavigator,
  },
  {
    key: Routes.SCREEN_MESSAGE_PRIVATE,
    name: Routes.SCREEN_MESSAGE_PRIVATE,
    component: PrivateMessagesScreen,
  },
  {
    key: Routes.SCREEN_LITTEN_POST_SHARED,
    name: Routes.SCREEN_LITTEN_POST_SHARED,
    component: LittenPostSharedScreen,
  },
  {
    key: Routes.SCREEN_LITTEN_POST,
    name: Routes.SCREEN_LITTEN_POST,
    component: LittenPostScreen,
  },
  {
    key: Routes.SCREEN_PROFILE_VIEW,
    name: Routes.SCREEN_PROFILE_VIEW,
    component: UserProfileScreen,
  },
  {
    key: Routes.SCREEN_NEW_LOCATION,
    name: Routes.SCREEN_NEW_LOCATION,
    component: SelectLocation,
  },
  {
    key: Routes.SCREEN_PROFILE_VERIFICATION,
    name: Routes.SCREEN_PROFILE_VERIFICATION,
    component: ProfileVerificationScreen,
  },
] as const

const Stack = createStackNavigator<RootStackParamList>()

const allStackScreens = stackScreens.map(({ key, name, component }) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore FIXME
  <Stack.Screen key={key} name={name} component={component} />
))

const Main = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    {allStackScreens}
  </Stack.Navigator>
)

export default Main
