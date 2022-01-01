import retry from 'async-retry'
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native'
import Toast from 'react-native-simple-toast'
import Geolocation from 'react-native-geolocation-service'
import Search from '@model/search'
import User from '@model/user'
import { userSchema } from '@db/schemas/user'
import { getExternalGeoInformation } from '@utils/network'
import { clearPersistence } from '@db/firestore'
import { setupRemoteConfig } from '@db/remote-config'
import { debugLog, logError } from '@utils/dev'
import { translate } from '@utils/i18n'
import { execOrTimeout } from '@utils/functions'
import { RECURSION_LIMIT } from '@utils/constants'
import type { BasicAuthUser } from '@store/types'
import type {
  Coordinates,
  DBCoordinateObject,
  EmptyCoordinates,
} from '@db/schemas/location'
import type { BasicUser } from '@model/types/user'
import type { BasicLitten } from '@model/types/litten'
import appConfig from '../../app.json'

export const openSetting = () => {
  Linking.openSettings().catch(() => {
    Toast.show(translate('feedback.system.cantOpenSettings'))
  })
}
export const hasLocationPermissionIOS = async (): Promise<boolean> => {
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
export const hasLocationPermission = async (): Promise<boolean> => {
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

  return false
}
export const getCurrentPosition = (): Promise<{
  coords: Coordinates | EmptyCoordinates
}> => {
  const options = {
    enableHighAccuracy: true,
    timeout: 15000,
  }

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(resolve, reject, options)
  })
}
export const getLocation = async (): Promise<{
  coords: Coordinates | EmptyCoordinates
}> => {
  const hasPermission = await hasLocationPermission()
  const emptyResponse = {
    coords: {
      latitude: null,
      longitude: null,
    },
  }

  if (!hasPermission) {
    return emptyResponse
  }

  try {
    const currentPosition = await execOrTimeout(getCurrentPosition(), 15000)
    return currentPosition
  } catch (err) {
    logError(err)
  }

  try {
    const coords = await getExternalGeoInformation()
    return {
      coords,
    }
  } catch (err) {
    logError(err)
  }

  return emptyResponse
}
export const setupUserInfo = async (
  authUser: BasicAuthUser,
): Promise<BasicUser | void> => {
  const userAuthUid = authUser?.uid

  if (userAuthUid) {
    const user = new User({
      id: userAuthUid,
    })

    await retry(
      async (bail, retryNum) => {
        debugLog('[SETUP] UPDATING USER INFO... ATTEMPT', retryNum)
        await user.get()

        if (!user.displayName) {
          throw new Error('SetupUserInfo - Failed to get user')
        }
      },
      {
        retries: RECURSION_LIMIT,
      },
    )

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
      const newCoordinates = {
        latitude,
        longitude,
      }

      if (latitude && longitude) {
        user.coordinates = newCoordinates
        debugLog('[SETUP] UPDATED USER COORDINATES...', newCoordinates)
      }

      return newCoordinates
    }
  }

  debugLog('[SETUP] USED EXISTING USER COORDINATES...', user.coordinates)
  return user.coordinates
}
export const setUpUserPosts = async (
  user: BasicUser,
): Promise<{
  userActivePosts: BasicLitten[]
  userInactivePosts: BasicLitten[]
}> => {
  if (user?.id) {
    const search = new Search({
      user,
    })
    const userActivePosts = await search.userActivePosts()
    const userInactivePosts = await search.userInactivePosts()
    debugLog('[SETUP] UPDATED USER POSTS...')
    return {
      userActivePosts,
      userInactivePosts,
    }
  }

  return {
    userActivePosts: [],
    userInactivePosts: [],
  }
}
export const setUpApp = async (
  authUser: BasicAuthUser,
): Promise<{
  error: Error | null
  user: BasicUser
  userActivePosts: BasicLitten[]
  userCoordinates: DBCoordinateObject
  userInactivePosts: BasicLitten[]
}> => {
  let user = userSchema
  let userActivePosts = []
  let userCoordinates = {
    latitude: null,
    longitude: null,
  }
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

  return {
    error,
    user,
    userActivePosts,
    userCoordinates,
    userInactivePosts,
  }
}
export const preSetup = async () => {
  await clearPersistence()
  await setupRemoteConfig()
}
