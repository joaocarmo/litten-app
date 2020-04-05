/**
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Onboard from './components/onboard'

import SplashScreen from 'react-native-splash-screen'

import { sleep } from './utils/functions'

const App: () => React$Node = () => {
  useEffect(() => {
    async function initiate() {
      await sleep(2)
    }

    initiate()

    SplashScreen.hide()
  }, [])

  return (
    <NavigationContainer>
      <Onboard />
    </NavigationContainer>
  )
}

export default App
