/**
 * @format
 * @flow
 */

import {
  FIRESTORE_EMULATOR_HOST,
  FIRESTORE_EMULATOR_PERSISTENCE,
  USE_FIREBASE_EMULATOR,
} from 'utils/env'
import { debugLog } from 'utils/dev'
import firestore from '@react-native-firebase/firestore'

/**
 * Use Local Emulator Suite during development
 * Docs:
 *  - https://firebase.google.com/docs/emulator-suite/connect_firestore
 *  - https://rnfirebase.io/reference/firestore/settings#host
 */
if (process.env.NODE_ENV === 'development' && USE_FIREBASE_EMULATOR) {
  debugLog('[FIREBASE] USING FIREBASE EMULATOR [FIRESTORE]')

  firestore().settings({
    host: FIRESTORE_EMULATOR_HOST,
    persistence: FIRESTORE_EMULATOR_PERSISTENCE,
    ssl: false,
  })

  if (!FIRESTORE_EMULATOR_PERSISTENCE) {
    debugLog('[FIREBASE] CLEARED PERSISTENCE [FIRESTORE]')

    firestore().clearPersistence()
  }
}

export default firestore
