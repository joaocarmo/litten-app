import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'remote-redux-devtools'
import AsyncStorage from '@react-native-community/async-storage'
import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['appSettings', 'formLogin', 'formRegister'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = (initialState) => {
  const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(),
  )

  const persistor = persistStore(store)

  if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers/index').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return { store, persistor }
}

export default configureStore
