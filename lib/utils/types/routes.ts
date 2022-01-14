import type { CompositeNavigationProp } from '@react-navigation/native'
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import type { StackNavigationProp } from '@react-navigation/stack'
import type { BasicUser } from '@model/types/user'

/**
 * Root navigation param types
 */

export type RootStackParamList = {
  'litten/post': undefined
  'litten/post/shared': undefined
  'message/private': undefined
  'new/location': undefined
  'profile/verification': undefined
  'profile/view': {
    user: BasicUser
  }
  'tabnav/index': undefined
}

export type RootTabParamList = {
  'tabnav/favourites': undefined
  'tabnav/favourites/posts': undefined
  'tabnav/favourites/searches': undefined
  'tabnav/home': undefined
  'tabnav/index': undefined
  'tabnav/messages': undefined
  'tabnav/new': undefined
  'tabnav/profile': undefined
}

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
  'profile/report': undefined
  'profile/settings': undefined
  'profile/webview': undefined
}

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
