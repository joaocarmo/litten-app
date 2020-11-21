/**
 * @format
 * @flow
 */

import 'react-native-gesture-handler'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { MenuProvider } from 'react-native-popup-menu'
import { NavigationContainer } from '@react-navigation/native'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from 'store'
import { useState } from 'react'
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
          <ActionSheetProvider>
            <MenuProvider>
              <Litten initializingStore={initializingStore} />
            </MenuProvider>
          </ActionSheetProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App
