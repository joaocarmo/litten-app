/**
 * @format
 * @flow
 */

import 'react-native-gesture-handler'
import NotificationService from 'config/notification-service'
import { NotificationsProvider } from 'components/notifications'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { MenuProvider } from 'react-native-popup-menu'
import { NavigationContainer } from '@react-navigation/native'
import { PersistGate } from 'redux-persist/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { store, persistor } from 'store'
import { useCallback, useState } from 'react'
import Litten from 'root/Litten'
import ErrorBoundary from 'components/error-boundary'
import linkingConfig from 'config/navigation/linking'
import { preSetup } from 'utils/setup'

const onNotification = (...args) => console.log('onNotification', ...args)

const onRegister = (...args) => console.log('onRegister', ...args)

const notifications = new NotificationService(onNotification, onRegister)

const App: () => React$Node = () => {
  const [initializingStore, setInitializingStore] = useState(true)

  const onBeforeLift = useCallback(async () => {
    await preSetup()

    setInitializingStore(false)
  }, [])

  return (
    <ErrorBoundary>
      <NotificationsProvider value={notifications}>
        <SafeAreaProvider>
          <Provider store={store}>
            <PersistGate
              loading={null}
              onBeforeLift={onBeforeLift}
              persistor={persistor}>
              <NavigationContainer linking={linkingConfig}>
                <ActionSheetProvider>
                  <MenuProvider>
                    <Litten initializingStore={initializingStore} />
                  </MenuProvider>
                </ActionSheetProvider>
              </NavigationContainer>
            </PersistGate>
          </Provider>
        </SafeAreaProvider>
      </NotificationsProvider>
    </ErrorBoundary>
  )
}

export default App
