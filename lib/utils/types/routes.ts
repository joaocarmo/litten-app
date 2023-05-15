import type {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native'
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import type {
  StackNavigationProp,
  StackScreenProps,
} from '@react-navigation/stack'
import type { BasicChat } from '@model/types/chat'
import type { BasicLitten } from '@model/types/litten'
import type { BasicUser } from '@model/types/user'
import type { DBCoordinateObject } from '@db/schemas/location'
import { Routes } from '@utils/constants'

/**
 * Root navigation param types
 */

export type OnboardStackParamList = {
  [Routes.SCREEN_NOAUTH_LOGIN]: undefined
  [Routes.SCREEN_NOAUTH_RECOVER]: undefined
  [Routes.SCREEN_NOAUTH_REGISTER]: undefined
  [Routes.SCREEN_NOAUTH_WELCOME]: undefined
}

export type HomeStackParamList = {
  [Routes.SCREEN_HOME_FILTER]: undefined
  [Routes.SCREEN_HOME_FILTER_SET]: {
    title: string
    filter: string
  }
  [Routes.SCREEN_HOME_INDEX]: undefined
}

export type ProfileStackParamList = {
  [Routes.SCREEN_DEV_HACKS]: undefined
  [Routes.SCREEN_PROFILE_ABOUT]: undefined
  [Routes.SCREEN_PROFILE_EDIT]: undefined
  [Routes.SCREEN_PROFILE_INDEX]: undefined
  [Routes.SCREEN_PROFILE_POSTS]: undefined
  [Routes.SCREEN_PROFILE_REPORT]: {
    type: string
    initialContent?: string
  }
  [Routes.SCREEN_PROFILE_SETTINGS]: undefined
  [Routes.SCREEN_PROFILE_WEBVIEW]: undefined
}

export type RootTabParamList = {
  [Routes.SCREEN_TAB_NAV_FAVOURITES]: undefined
  [Routes.SCREEN_TAB_NAV_FAVOURITES_POSTS]: undefined
  [Routes.SCREEN_TAB_NAV_FAVOURITES_SEARCHES]: undefined
  [Routes.SCREEN_TAB_NAV_HOME]: NavigatorScreenParams<HomeStackParamList>
  [Routes.SCREEN_TAB_NAV_MESSAGES]: undefined
  [Routes.SCREEN_TAB_NAV_NEW]: undefined
  [Routes.SCREEN_TAB_NAV_PROFILE]: NavigatorScreenParams<ProfileStackParamList>
}

export type RootStackParamList = {
  [Routes.SCREEN_LITTEN_POST]: {
    litten: BasicLitten
    preview?: boolean
    user: BasicUser
  }
  [Routes.SCREEN_LITTEN_POST_SHARED]: {
    littenUid: string
  }
  [Routes.SCREEN_MESSAGE_PRIVATE]: {
    chat?: BasicChat
    recipient: BasicUser
    litten: BasicLitten
  }
  [Routes.SCREEN_NEW_LOCATION]: {
    initialCoordinates: DBCoordinateObject
    dispatchToAction: string
  }
  [Routes.SCREEN_PROFILE_VERIFICATION]: undefined
  [Routes.SCREEN_PROFILE_VIEW]: {
    user: BasicUser
  }
  [Routes.SCREEN_TAB_NAV_INDEX]: NavigatorScreenParams<RootTabParamList>
}

export type TabularStackParamList = Record<string, undefined>

/**
 * Routes
 */

export type RoutesScreenName = string

/**
 * Screen navigation param types
 */

export type ProfileIndexScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, Routes.SCREEN_TAB_NAV_INDEX>,
  CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList, Routes.SCREEN_TAB_NAV_PROFILE>,
    StackNavigationProp<ProfileStackParamList, Routes.SCREEN_PROFILE_INDEX>
  >
>

export type ProfileMainScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, Routes.SCREEN_TAB_NAV_INDEX>,
  CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList, Routes.SCREEN_TAB_NAV_PROFILE>,
    StackNavigationProp<ProfileStackParamList, Routes.SCREEN_PROFILE_INDEX>
  >
>

export type ProfileAboutScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, Routes.SCREEN_TAB_NAV_INDEX>,
  CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList, Routes.SCREEN_TAB_NAV_PROFILE>,
    StackNavigationProp<ProfileStackParamList, Routes.SCREEN_PROFILE_ABOUT>
  >
>

export type MessagePrivateScreenProps = StackScreenProps<
  RootStackParamList,
  Routes.SCREEN_MESSAGE_PRIVATE
>

export type UseParsePatternsNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, Routes.SCREEN_TAB_NAV_INDEX>,
  BottomTabNavigationProp<RootTabParamList, Routes.SCREEN_TAB_NAV_MESSAGES>
>

export type ChatOptionsNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, Routes.SCREEN_TAB_NAV_INDEX>,
  BottomTabNavigationProp<RootTabParamList, Routes.SCREEN_TAB_NAV_MESSAGES>
>

export type ActiveMessagesNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, Routes.SCREEN_TAB_NAV_INDEX>,
  BottomTabNavigationProp<RootTabParamList, Routes.SCREEN_TAB_NAV_MESSAGES>
>

export type LittenPostScreenProps = StackScreenProps<
  RootStackParamList,
  Routes.SCREEN_LITTEN_POST
>

export type LittenPostSharedScreenProps = StackScreenProps<
  RootStackParamList,
  Routes.SCREEN_LITTEN_POST_SHARED
>

export type LittenContactOptionsNavigationProp = StackNavigationProp<
  RootStackParamList,
  Routes.SCREEN_LITTEN_POST
>

export type HomeIndexHeaderNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, Routes.SCREEN_TAB_NAV_INDEX>,
  CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList, Routes.SCREEN_TAB_NAV_HOME>,
    StackNavigationProp<HomeStackParamList, Routes.SCREEN_HOME_FILTER>
  >
>

export type HomeFilterScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, Routes.SCREEN_TAB_NAV_INDEX>,
  CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList, Routes.SCREEN_TAB_NAV_HOME>,
    StackNavigationProp<HomeStackParamList, Routes.SCREEN_HOME_FILTER>
  >
>

export type UseSafeNavigationProp = StackNavigationProp<
  RootStackParamList,
  Routes.SCREEN_TAB_NAV_INDEX
>

export type RootNavigationProp = StackScreenProps<
  RootStackParamList,
  Routes.SCREEN_TAB_NAV_INDEX
>

export type FormProfileNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, Routes.SCREEN_TAB_NAV_INDEX>,
  CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList, Routes.SCREEN_TAB_NAV_PROFILE>,
    StackNavigationProp<ProfileStackParamList, Routes.SCREEN_PROFILE_EDIT>
  >
>

export type NewFormNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, Routes.SCREEN_TAB_NAV_INDEX>,
  BottomTabNavigationProp<RootTabParamList, Routes.SCREEN_TAB_NAV_NEW>
>

export type LoginFormNavigationProp = StackNavigationProp<
  OnboardStackParamList,
  Routes.SCREEN_NOAUTH_LOGIN
>

export type CreateNewCTANavigationProp = StackNavigationProp<
  OnboardStackParamList,
  Routes.SCREEN_NOAUTH_WELCOME
>

export type SignInCTANavigationProp = StackNavigationProp<
  OnboardStackParamList,
  Routes.SCREEN_NOAUTH_WELCOME
>

export type ActionsNavigationProp = StackNavigationProp<
  OnboardStackParamList,
  Routes.SCREEN_NOAUTH_WELCOME
>

export type LittenCardComponentNavigationProp = StackNavigationProp<
  RootStackParamList,
  Routes.SCREEN_TAB_NAV_INDEX
>
