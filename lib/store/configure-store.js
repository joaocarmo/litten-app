/**
 * @format
 * @flow
 */

import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'remote-redux-devtools'
import AsyncStorage from '@react-native-community/async-storage'
import rootReducer from './reducers'
import type { Action, Dispatch } from './types/state'
import appConfig from '../../app.json'

const persistConfig = {
  key: appConfig.name,
  storage: AsyncStorage,
  blacklist: ['appSettings', 'formLogin', 'formProfile', 'formRegister'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = (initialState: any) => {
  const store = createStore<any, Action, Dispatch>(
    persistedReducer,
    initialState,
    composeWithDevTools(),
  )

  const persistor = persistStore(store)

  // Enable hot module replacement for reducers
  // $FlowFixMe
  if (module.hot) {
    // $FlowFixMe
    module.hot.accept(() => {
      const nextRootReducer: $FlowFixMe = require('./reducers/index').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return { store, persistor }
}

export default configureStore
