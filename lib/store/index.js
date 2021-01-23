/**
 * @format
 * @flow
 */

import configureStore from 'store/configure-store'

const { store, persistor } = (configureStore(): any)

export { store, persistor }
