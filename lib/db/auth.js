/**
 * @format
 * @flow
 */

import { FIREBASE_AUTH_EMULATOR_HOST } from '@env'
import auth from '@react-native-firebase/auth'

/**
 * Use Local Emulator Suite during development
 * Docs:
 *  - https://firebase.google.com/docs/emulator-suite/connect_auth
 *  - https://rnfirebase.io/reference/auth#useEmulator
 */
if (process.env.NODE_ENV === 'development') {
  auth().useEmulator(FIREBASE_AUTH_EMULATOR_HOST)
}

export default auth
