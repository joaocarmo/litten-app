import {
  APP_IS_DEV,
  FIREBASE_STORAGE_EMULATOR_HOST,
  USE_FIREBASE_EMULATOR,
} from '@utils/env'
import storage from '@react-native-firebase/storage'
import { STORAGE_USER_AVATAR } from '@utils/constants'
import { debugLog, logError } from '@utils/dev'

/**
 * Use Local Emulator Suite during development
 * Docs:
 *  - https://firebase.google.com/docs/emulator-suite/connect_storage
 *  - https://rnfirebase.io/reference/storage#useEmulator
 */
if (APP_IS_DEV && USE_FIREBASE_EMULATOR && FIREBASE_STORAGE_EMULATOR_HOST) {
  const [host, portStr] = FIREBASE_STORAGE_EMULATOR_HOST.split(':')
  const port = parseInt(portStr, 10)

  debugLog(`[FIREBASE] USING FIREBASE EMULATOR [STORAGE] ${host}:${port}`)

  storage().useEmulator(host, port)
}

/**
 * Uploads a user's avatar to the storage
 * @async
 * @param {string} photoURL - An string representation of an image URI
 * @param {{userAuthUid: string}} options - Extra options, e.g. the user's uid
 * @returns {Promise<string>} The file's download URL
 */
export const uploadUserAvatar = async (
  photoURL: string,
  { userAuthUid = '' },
): Promise<string> => {
  if (photoURL && typeof photoURL === 'string') {
    try {
      const fileExt = 'jpg'
      const strRef = `${STORAGE_USER_AVATAR}/${userAuthUid}.${fileExt}`
      const storageRef = storage().ref(strRef)
      await storageRef.putFile(photoURL)
      const downloadURL = await storageRef.getDownloadURL()
      return downloadURL
    } catch (err) {
      logError(err)
    }

    return photoURL
  }

  return ''
}

export default storage
