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
 * @param {{userUuid: string}} options - Extra options, e.g. the user's uid
 * @returns {Promise.<string>} The file's download URL
 */
export async function uploadUserAvatar(
  avatar: { uri: string } | null = null,
  { userUuid = '' }: { userUuid: string } = {},
) {
  const fileURI = avatar?.uri
  if (typeof fileURI === 'string') {
    try {
      const fileExt = 'jpg'
      const strRef = `${STORAGE_USER_AVATAR}/${userUuid}.${fileExt}`
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
