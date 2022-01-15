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

/**
 * Root navigation param types
 */

export type OnboardStackParamList = {
  'noauth/login': undefined
  'noauth/recover': undefined
  'noauth/register': undefined
  'noauth/welcome': undefined
}

export type HomeStackParamList = {
  'home/filter': undefined
  'home/filter/set': undefined
  'home/index': undefined
}

export type ProfileStackParamList = {
  'dev/hacks': undefined
  'profile/about': undefined
  'profile/edit': undefined
  'profile/index': undefined
  'profile/posts': undefined
  'profile/report': {
    type: string
    initialContent?: string
  }
  'profile/settings': undefined
  'profile/webview': undefined
}

export type RootTabParamList = {
  'tabnav/favourites': undefined
  'tabnav/favourites/posts': undefined
  'tabnav/favourites/searches': undefined
  'tabnav/home': undefined
  'tabnav/messages': undefined
  'tabnav/new': undefined
  'tabnav/profile': NavigatorScreenParams<ProfileStackParamList>
}

export type RootStackParamList = {
  'litten/post': {
    litten: BasicLitten
    user: BasicUser
  }
  'litten/post/shared': undefined
  'message/private': {
    chat: BasicChat
    recipient: BasicUser
    litten: BasicLitten
  }
  'new/location': undefined
  'profile/verification': undefined
  'profile/view': {
    user: BasicUser
  }
  'tabnav/index': NavigatorScreenParams<RootTabParamList>
}

export type TabularStackParamList = Record<string, undefined>

/**
 * Screen navigation param types
 */

export type ProfileIndexScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'tabnav/index'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList, 'tabnav/profile'>,
    StackNavigationProp<ProfileStackParamList, 'profile/index'>
  >
>

export type ProfileMainScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'tabnav/index'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList, 'tabnav/profile'>,
    StackNavigationProp<ProfileStackParamList, 'profile/index'>
  >
>

export type ProfileAboutScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'tabnav/index'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList, 'tabnav/profile'>,
    StackNavigationProp<ProfileStackParamList, 'profile/about'>
  >
>

export type MessagePrivateScreenProps = StackScreenProps<
  RootStackParamList,
  'message/private'
>

export type UseParsePatternsNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'tabnav/index'>,
  BottomTabNavigationProp<RootTabParamList, 'tabnav/messages'>
>

export type ChatOptionsNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'tabnav/index'>,
  BottomTabNavigationProp<RootTabParamList, 'tabnav/messages'>
>

export type ActiveMessagesNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'tabnav/index'>,
  BottomTabNavigationProp<RootTabParamList, 'tabnav/messages'>
>
