/**
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { PersistGate } from 'redux-persist/integration/react'
import SplashScreen from 'react-native-splash-screen'
import Onboard from './components/onboard'
import configureStore from './store/configure-store'

const { store, persistor } = configureStore()

const App: () => React$Node = () => {
  const onBeforeLift = () => {
    SplashScreen.hide()
  }

  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        onBeforeLift={onBeforeLift}
        persistor={persistor}>
        <NavigationContainer>
          <Onboard />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App
