/**
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler'
import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from 'store/configure-store'
import Litten from './Litten'

const { store, persistor } = configureStore()

const App: () => React$Node = () => {
  const [initializingStore, setInitializingStore] = useState(true)

  const onBeforeLift = () => {
    setInitializingStore(false)
  }

  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        onBeforeLift={onBeforeLift}
        persistor={persistor}>
        <NavigationContainer>
          <Litten initializingStore={initializingStore} />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App
