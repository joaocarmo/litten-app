import { useEffect, useMemo } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
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
import {
  SCREEN_LITTEN_POST_SHARED,
  SCREEN_LITTEN_POST,
  SCREEN_MESSAGE_PRIVATE,
  SCREEN_NEW_LOCATION,
  SCREEN_PROFILE_VERIFICATION,
  SCREEN_TAB_NAV_FAVOURITES,
  SCREEN_TAB_NAV_HOME,
  SCREEN_TAB_NAV_INDEX,
  SCREEN_TAB_NAV_MESSAGES,
  SCREEN_TAB_NAV_NEW,
  SCREEN_TAB_NAV_PROFILE,
  SCREEN_PROFILE_VIEW,
} from '@utils/constants'
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
            tabBarAccessibilityLabel: translate(
              'accessibility.tabBar.favourites',
            ),
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
            tabBarBadge: unreadMessages,
            tabBarAccessibilityLabel: translate(
              'accessibility.tabBar.messages',
            ),
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
    key: SCREEN_TAB_NAV_INDEX,
    name: SCREEN_TAB_NAV_INDEX,
    component: TabNavigator,
  },
  {
    key: SCREEN_MESSAGE_PRIVATE,
    name: SCREEN_MESSAGE_PRIVATE,
    component: PrivateMessagesScreen,
  },
  {
    key: SCREEN_LITTEN_POST_SHARED,
    name: SCREEN_LITTEN_POST_SHARED,
    component: LittenPostSharedScreen,
  },
  {
    key: SCREEN_LITTEN_POST,
    name: SCREEN_LITTEN_POST,
    component: LittenPostScreen,
  },
  {
    key: SCREEN_PROFILE_VIEW,
    name: SCREEN_PROFILE_VIEW,
    component: UserProfileScreen,
  },
  {
    key: SCREEN_NEW_LOCATION,
    name: SCREEN_NEW_LOCATION,
    component: SelectLocation,
  },
  {
    key: SCREEN_PROFILE_VERIFICATION,
    name: SCREEN_PROFILE_VERIFICATION,
    component: ProfileVerificationScreen,
  },
] as const

const Stack = createStackNavigator<RootStackParamList>()

const allStackScreens = stackScreens.map(({ key, name, component }) => (
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
