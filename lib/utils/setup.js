/**
 * @format
 * @flow
 */

import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import { store } from 'store'
import Search from 'model/search'
import User from 'model/user'
import type { BasicUser } from 'model/types/user'
import {
  setActivePosts,
  setExtra,
  setLocationCoordinates,
  setPastPosts,
} from 'store/actions/authenticated-user'
import { debugLog, logError } from './functions'
import { translate } from './i18n'
import appConfig from '../../app.json'

export const hasLocationPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert(translate('feedback.system.cantOpenSettings'))
    })
  }

  const status = await Geolocation.requestAuthorization('whenInUse')

  if (status === 'granted') {
    return true
  }

  if (status === 'denied') {
    // Do nothing
  }

  if (status === 'disabled') {
    Alert.alert(
      translate('feedback.system.allowLocation', {
        appName: appConfig.displayName,
      }),
      '',
      [
        {
          text: translate('feedback.system.goToSettings'),
          onPress: openSetting,
        },
        {
          text: translate('feedback.system.dontUseLocation'),
          onPress: () => null,
        },
      ],
    )
  }

  return false
}

export const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const hasPermission = await hasLocationPermissionIOS()
    return hasPermission
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  )

  if (hasPermission) {
    return true
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  )

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show(
      translate('feedback.system.locationDeniedByUser'),
      ToastAndroid.LONG,
    )
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      translate('feedback.system.locationRevokedByUser'),
      ToastAndroid.LONG,
    )
  }

  return false
}

export const getCurrentPosition = (): Promise<any> => {
  const options = { enableHighAccuracy: true }

  return new Promise((resolve, reject) =>
    Geolocation.getCurrentPosition(resolve, reject, options),
  )
}

export const getLocation = async () => {
  const hasPermission = await hasLocationPermission()

  if (!hasPermission) {
    return
  }

  try {
    return await getCurrentPosition()
  } catch (err) {
    logError(err)
  }
}

export const setupUserInfo = async (authUser: any) => {
  const userAuthUid = authUser?.uid
  if (userAuthUid) {
    const user = new User({ userAuthUid })
    await user.get()
    const userInfo = user.toJSON()
    store.dispatch(setExtra(userInfo))
    debugLog('UPDATED USER INFO...')
    return userInfo
  }
}

export const setUpUserLocation = async (userInfo: BasicUser) => {
  const user = new User(userInfo)
  const currentPosition = await getLocation()
  if (currentPosition?.coords) {
    const {
      coords: { latitude, longitude },
    } = currentPosition
    const newCoordinates = { latitude, longitude }
    store.dispatch(setLocationCoordinates(newCoordinates))
    user.coordinates = newCoordinates
    debugLog('UPDATED USER COORDINATES...')
  }
}

export const setUpUserPosts = async (user: BasicUser) => {
  if (user?.id) {
    const search = new Search({ user })
    const userActivePosts = await search.userActivePosts()
    store.dispatch(setActivePosts(userActivePosts))
    const userInactivePosts = await search.userInactivePosts()
    store.dispatch(setPastPosts(userInactivePosts))
    debugLog('UPDATED USER POSTS...')
  }
}

export const setUpApp = async (authUser: any) => {
  if (authUser) {
    const user = await setupUserInfo(authUser)
    if (user) {
      await setUpUserLocation(user)
      await setUpUserPosts(user)
    }
  }
}
