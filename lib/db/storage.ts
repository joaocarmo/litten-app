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
 * Uploads a file to the storage
 * @async
 * @param {string} storagePath - Where the file should be stored in the bucket
 * @param {string} filePath - Where the file is located in the device
 * @returns {Promise<string>} The file's download URL
 */
export const uploadAndGetDownloadUrl = async (
  storagePath: string,
  filePath: string,
): Promise<string> => {
  if (filePath && typeof filePath === 'string') {
    try {
      const storageRef = storage().ref(storagePath)
      const task = await storageRef.putFile(filePath)

      if (task.state === 'success') {
        const downloadURL = await storageRef.getDownloadURL()
        return downloadURL
      } else {
        debugLog(`[FIREBASE] STORAGE UPLOAD FAILED`)
        logError(task.error)
      }
    } catch (err) {
      logError(err)
    }

    return filePath
  }

  return ''
}

/**
 * Uploads a user's avatar to the storage
 * @async
 * @param {string} photoURL - A string representation of an image URI
 * @param {{userAuthUid: string}} options - Extra options, e.g. the user's uid
 * @returns {Promise<string>} The file's download URL
 */
export const uploadUserAvatar = async (
  photoURL: string,
  { userAuthUid = '' },
): Promise<string> => {
  const fileExt = 'jpg'
  const strRef = `${STORAGE_USER_AVATAR}/${userAuthUid}.${fileExt}`
  const downloadURL = await uploadAndGetDownloadUrl(strRef, photoURL)
  return downloadURL
}

export default storage
