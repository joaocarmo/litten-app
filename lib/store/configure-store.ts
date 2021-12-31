import { APP_IS_DEV } from 'utils/env'
import { persistStore, persistReducer } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import devToolsEnhancer from 'remote-redux-devtools'
import rootReducer from 'store/reducers'
import { devToolsConfig, persistConfig } from 'config/store'

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
  if (APP_IS_DEV && module.hot) {
    module.hot.accept(() => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
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
