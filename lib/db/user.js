/**
 * @format
 * @flow
 */

import { FIRESTORE_LOCALHOST } from '@env'
import firestore from '@react-native-firebase/firestore'
import { DB_USER_COLLECTION } from 'utils/constants'
import { store } from 'store'
import { setExtra } from 'store/actions/authenticated-user'
import { logError } from 'utils/functions'
import { userSchema } from './schemas/user'

/**
 * Use Local Emulator Suite during development
 * Docs:
 *  - https://firebase.google.com/docs/emulator-suite/connect_firestore
 *  - https://rnfirebase.io/reference/firestore/settings#host
 */
if (process.env.NODE_ENV === 'development') {
  firestore().settings({
    host: FIRESTORE_LOCALHOST,
    persistence: false,
    ssl: false,
  })
}

/**
 * Creates a new user in Firestore
 * @async
 * @param {Object.<string, string>} userInfo - A user object
 * @returns {Promise.<void>}
 */
export async function createNewUser(userInfo: any) {
  try {
    const userObject = { ...userSchema, ...userInfo }
    await firestore().collection(DB_USER_COLLECTION).add(userObject)
    store.dispatch(setExtra(userObject))
  } catch (err) {
    logError(err)
  }
}

/**
 * Finds a user in Firestore by auth uid and stores it
 * @async
 * @param {string} authUuid - A user's auth uid
 * @returns {Promise.<void>}
 */
export async function getUserFromUid(authUuid: string) {
  try {
    const querySnapshot = await firestore()
      .collection(DB_USER_COLLECTION)
      .where('authUuid', '==', authUuid)
      .get()
    const [queryDocumentSnapshot] = querySnapshot.docs
    const userInfo = querySnapshot.empty ? {} : queryDocumentSnapshot.data()
    const userObject = { ...userSchema, ...userInfo }
    store.dispatch(setExtra(userObject))
    return userObject
  } catch (err) {
    logError(err)
    return null
  }
}
