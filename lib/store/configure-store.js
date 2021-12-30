/**
 * @format
 * @flow
 */

import { APP_IS_DEV } from 'utils/env'
import { persistStore, persistReducer } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import devToolsEnhancer from 'remote-redux-devtools'
import rootReducer from 'store/reducers'
import { devToolsConfig, persistConfig } from 'config/store'
import type { Persistor } from 'redux-persist/lib/types'
import type { Store } from 'redux'
import type { Action, Dispatch } from 'store/types/state'

const setupStore = (): {|
  persistor: Persistor,
  store: Store<any, Action, Dispatch>,
|} => {
  const persistedReducer = persistReducer<$FlowFixMe, $FlowFixMe>(
    persistConfig,
    rootReducer,
  )

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    enhancers: [devToolsEnhancer(devToolsConfig)],
  })

  const persistor = persistStore(store)

  // Enable hot module replacement for reducers
  // $FlowFixMe
  if (APP_IS_DEV && module.hot) {
    // $FlowFixMe
    module.hot.accept(() => {
      const nextRootReducer: $FlowFixMe = require('./reducers/index').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return { store, persistor }
}

export default setupStore
