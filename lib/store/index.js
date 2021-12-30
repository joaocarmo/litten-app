/**
 * @format
 * @flow
 */

import setupStore from 'store/configure-store'

const { store, persistor } = (setupStore(): any)

export { store, persistor }
