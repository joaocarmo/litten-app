/**
 * @format
 * @flow
 */

import configureStore, { clearStorage } from 'store/configure-store'

const { store, persistor } = configureStore()

export { clearStorage, store, persistor }
