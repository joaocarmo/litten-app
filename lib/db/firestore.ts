import {
  APP_IS_DEV,
  FIRESTORE_EMULATOR_HOST,
  FIRESTORE_EMULATOR_PERSISTENCE,
  USE_FIREBASE_EMULATOR,
} from '@utils/env'
import { debugLog } from '@utils/dev'
import firestore from '@react-native-firebase/firestore'

/**
 * Use Local Emulator Suite during development
 * Docs:
 *  - https://firebase.google.com/docs/emulator-suite/connect_firestore
 *  - https://rnfirebase.io/reference/firestore/settings#host
 */
if (APP_IS_DEV && USE_FIREBASE_EMULATOR && FIRESTORE_EMULATOR_HOST) {
  const [host, portStr] = FIRESTORE_EMULATOR_HOST.split(':')
  const port = parseInt(portStr, 10)

  debugLog(`[FIREBASE] USING FIREBASE EMULATOR [FIRESTORE] ${host}:${port}`)

  firestore().settings({
    persistence: FIRESTORE_EMULATOR_PERSISTENCE,
  })

  firestore().useEmulator(host, port)

  firestore.setLogLevel('debug')
}

type NetworkManagerHook = [() => boolean, () => Promise<void>]

const networkManager = (startState = true): (() => NetworkManagerHook) => {
  let networkActive = startState

  const getState = () => networkActive

  const toggleState = async () => {
    if (networkActive) {
      await firestore().disableNetwork()
    } else {
      await firestore().enableNetwork()
    }

    networkActive = !networkActive
  }

  return () => [getState, toggleState]
}

export const simulateNetwork: () => NetworkManagerHook = networkManager()

export const clearPersistence = async () => {
  if (!FIRESTORE_EMULATOR_PERSISTENCE) {
    debugLog('[FIREBASE] CLEARED PERSISTENCE [FIRESTORE]')

    try {
      await firestore().terminate()
      await firestore().clearPersistence()
    } catch (err) {
      debugLog(err)
    }
  }
}

export default firestore
