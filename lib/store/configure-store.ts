/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-import-module-exports */
import { APP_IS_DEV } from '@utils/env'
import { persistStore, persistReducer } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import devToolsEnhancer from 'remote-redux-devtools'
import rootReducer from '@store/reducers'
import { devToolsConfig, persistConfig } from '@config/store'

const setupStore = (): {
  persistor
  store
} => {
  const persistedReducer = persistReducer(persistConfig, rootReducer)
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
  // ts-ignore-next-line
  if (APP_IS_DEV && module.hot) {
    // ts-ignore-next-line
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers/index').default

      store.replaceReducer(nextRootReducer)
    })
  }

  return {
    store,
    persistor,
  }
}

export default setupStore
