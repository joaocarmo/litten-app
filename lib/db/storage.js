/**
 * @format
 * @flow
 */

import storage from '@react-native-firebase/storage'
import { STORAGE_USER_AVATAR } from 'utils/constants'
import { logError } from 'utils/functions'

/**
 * Uploads a user's avatar to the storage
 * @async
 * @param {({uri: string}|null)} avatar - An object containing an image URI
 * @param {{authUuid: string}} options - Extra options, e.g. the user's uid
 * @returns {Promise.<string>} The file's download URL
 */
export async function uploadUserAvatar(avatar = null, { authUuid = '' } = {}) {
  const fileURI = avatar?.uri
  if (typeof fileURI === 'string') {
    try {
      const fileExt = 'jpg'
      const strRef = `${STORAGE_USER_AVATAR}/${authUuid}.${fileExt}`
      const storageRef = storage().ref(strRef)
      await storageRef.putFile(fileURI)
      const downloadURL = await storageRef.getDownloadURL()
      return downloadURL
    } catch (err) {
      logError(err)
    }
  }
  return avatar
}
