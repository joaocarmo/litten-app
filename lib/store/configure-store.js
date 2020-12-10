/**
 * @format
 * @flow
 */

import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'remote-redux-devtools'
import rootReducer from 'store/reducers'
import { devToolsConfig, persistConfig } from 'config/store'
import type { Action, Dispatch } from 'store/types/state'

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = composeWithDevTools(devToolsConfig)

const configureStore = (initialState: any) => {
  const store = createStore<any, Action, Dispatch>(
    persistedReducer,
    initialState,
    composeEnhancers(),
  )

  const persistor = persistStore(store)

  // Enable hot module replacement for reducers
  // $FlowFixMe
  if (process.env.NODE_ENV === 'development' && module.hot) {
    // $FlowFixMe
    module.hot.accept(() => {
      const nextRootReducer: $FlowFixMe = require('./reducers/index').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return { store, persistor }
}

export default configureStore
