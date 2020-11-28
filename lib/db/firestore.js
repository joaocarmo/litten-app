/**
 * @format
 * @flow
 */

import { FIRESTORE_EMULATOR_HOST, FIRESTORE_EMULATOR_PERSISTENCE } from '@env'
import firestore from '@react-native-firebase/firestore'

/**
 * Use Local Emulator Suite during development
 * Docs:
 *  - https://firebase.google.com/docs/emulator-suite/connect_firestore
 *  - https://rnfirebase.io/reference/firestore/settings#host
 */
if (process.env.NODE_ENV === 'development') {
  firestore().settings({
    host: FIRESTORE_EMULATOR_HOST,
    persistence: FIRESTORE_EMULATOR_PERSISTENCE === 'true',
    ssl: false,
  })
}

export default firestore
