/**
 * @format
 * @flow
 */

import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'remote-redux-devtools'
import AsyncStorage from '@react-native-community/async-storage'
import rootReducer from './reducers'
import type { State, Action, Dispatch } from './types/state'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['appSettings', 'formLogin', 'formRegister'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = (initialState: any) => {
  const store = createStore<State, Action, Dispatch>(
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
      const nextRootReducer = require('./reducers/index').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return { store, persistor }
}

export default configureStore
