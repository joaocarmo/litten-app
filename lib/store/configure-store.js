/**
 * @format
 * @flow
 */

import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'remote-redux-devtools'
import AsyncStorage from '@react-native-community/async-storage'
import rootReducer from 'store/reducers'
import type { Action, Dispatch } from 'store/types/state'
import appConfig from '../../app.json'

const persistConfig = {
  key: appConfig.name,
  storage: AsyncStorage,
  blacklist: ['formLogin', 'formProfile', 'formRegister', 'formReport'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = composeWithDevTools({
  realtime: process.env.NODE_ENV === 'development',
  name: appConfig.name,
  hostname: 'localhost',
  port: 8000,
})

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
