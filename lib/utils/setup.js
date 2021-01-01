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
import Search from 'model/search'
import User from 'model/user'
import { userSchema } from 'db/schemas/user'
import { debugLog, logError } from 'utils/dev'
import { translate } from 'utils/i18n'
import type { BasicAuthUser } from 'store/types'
import type { DBCoordinateObject } from 'db/schemas/location'
import type { BasicUser } from 'model/types/user'
import type { BasicLitten } from 'model/types/litten'
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

export const setupUserInfo = async (
  authUser: BasicAuthUser,
): Promise<BasicUser | void> => {
  const userAuthUid = authUser?.uid
  if (userAuthUid) {
    const user = new User({ id: userAuthUid })
    await user.get()
    const userInfo = user.toJSON()
    debugLog('[SETUP] UPDATED USER INFO...')
    return userInfo
  }
}

export const setUpUserLocation = async (
  userInfo: BasicUser,
): Promise<DBCoordinateObject | void> => {
  const user = new User(userInfo)
  if (!user.coordinates.latitude || !user.coordinates.longitude) {
    const currentPosition = await getLocation()
    if (currentPosition?.coords) {
      const {
        coords: { latitude, longitude },
      } = currentPosition
      const newCoordinates = { latitude, longitude }
      user.coordinates = newCoordinates
      debugLog('[SETUP] UPDATED USER COORDINATES...')
      return newCoordinates
    }
  }
  debugLog('[SETUP] USED EXISTING USER COORDINATES...')
  return user.coordinates
}

export const setUpUserPosts = async (
  user: BasicUser,
): Promise<{
  userActivePosts: BasicLitten[],
  userInactivePosts: BasicLitten[],
}> => {
  if (user?.id) {
    const search = new Search({ user })
    const userActivePosts = await search.userActivePosts()
    const userInactivePosts = await search.userInactivePosts()
    debugLog('[SETUP] UPDATED USER POSTS...')
    return { userActivePosts, userInactivePosts }
  }
  return { userActivePosts: [], userInactivePosts: [] }
}

export const setUpApp = async (
  authUser: BasicAuthUser,
): Promise<{
  error: Error | null,
  user: BasicUser,
  userActivePosts: BasicLitten[],
  userCoordinates: DBCoordinateObject,
  userInactivePosts: BasicLitten[],
}> => {
  let user = userSchema
  let userActivePosts = []
  let userCoordinates = { latitude: null, longitude: null }
  let userInactivePosts = []
  let error = null
  try {
    if (authUser) {
      user = (await setupUserInfo(authUser)) ?? user
      if (user) {
        userCoordinates = (await setUpUserLocation(user)) ?? userCoordinates
        const userPosts = await setUpUserPosts(user)
        userActivePosts = userPosts.userActivePosts
        userInactivePosts = userPosts.userInactivePosts
      }
    }
  } catch (err) {
    error = err
    logError(err)
  }
  return { error, user, userActivePosts, userCoordinates, userInactivePosts }
}
