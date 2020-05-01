/**
 * @format
 * @flow strict-local
 */

import configureStore from 'store/configure-store'

const { store, persistor } = configureStore()

export { store, persistor }
