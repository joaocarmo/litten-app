/**
 * @format
 * @flow
 */

import storage from '@react-native-firebase/storage'
import { STORAGE_USER_AVATAR } from 'utils/constants'
import { logError } from 'utils/dev'

/**
 * Uploads a user's avatar to the storage
 * @async
 * @param {string} photoURL - An string representation of an image URI
 * @param {{userAuthUid: string}} options - Extra options, e.g. the user's uid
 * @returns {Promise.<string>} The file's download URL
 */
export async function uploadUserAvatar(
  photoURL: string,
  { userAuthUid = '' }: { userAuthUid: string } = {},
) {
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
  }
  return photoURL
}
