/**
 * @format
 * @flow
 */

import 'react-native-gesture-handler'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { PersistGate } from 'redux-persist/integration/react'
import { MenuProvider } from 'react-native-popup-menu'
import { store, persistor } from 'store'
import Litten from './Litten'

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
          <MenuProvider>
            <Litten initializingStore={initializingStore} />
          </MenuProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App
