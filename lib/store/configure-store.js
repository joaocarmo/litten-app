/**
 * @format
 * @flow
 */

import type { Persistor } from '../../node_modules/redux-persist/lib/types'
import { APP_IS_DEV } from 'utils/env'
import { createStore, type Store } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'remote-redux-devtools'
import rootReducer from 'store/reducers'
import { devToolsConfig, persistConfig } from 'config/store'
import type { Action, Dispatch } from 'store/types/state'

const persistedReducer = persistReducer<$FlowFixMe, $FlowFixMe>(
  persistConfig,
  rootReducer,
)

const composeEnhancers = composeWithDevTools(devToolsConfig)

const configureStore = (
  initialState: $FlowFixMe,
): {| persistor: Persistor, store: Store<any, Action, Dispatch> |} => {
  const store = createStore<$FlowFixMe, Action, Dispatch>(
    persistedReducer,
    initialState,
    composeEnhancers(),
  )

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

export default configureStore
