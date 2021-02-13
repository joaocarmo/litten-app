/**
 * @format
 * @flow
 */

import 'react-native-gesture-handler'
import { useCallback, useEffect, useState, useRef } from 'react'
import BackgroundService from 'config/background-service'
import NotificationService from 'config/notification-service'
import { TasksProvider } from 'components/tasks'
import { NotificationsProvider } from 'components/notifications'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { MenuProvider } from 'react-native-popup-menu'
import { NavigationContainer } from '@react-navigation/native'
import { PersistGate } from 'redux-persist/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { store, persistor } from 'store'
import { useNotificationHandler } from 'hooks'
import Litten from 'root/Litten'
import ErrorBoundary from 'components/error-boundary'
import linkingConfig from 'config/navigation/linking'
import { isReadyRef, navigationRef } from 'config/navigation/root'
import { preSetup } from 'utils/setup'

const App: () => React$Node = () => {
  const [initializingStore, setInitializingStore] = useState(true)

  const [onNotification] = useNotificationHandler()

  const backgroundService = useRef(new BackgroundService()).current
  const notifications = useRef(new NotificationService(onNotification)).current

  const onBeforeLift = useCallback(async () => {
    await preSetup()

    setInitializingStore(false)
  }, [])

  const handleOnNavigationReady = useCallback(() => {
    isReadyRef.current = true
  }, [])

  useEffect(() => {
    return () => {
      isReadyRef.current = false
    }
  }, [])

  return (
    <ErrorBoundary>
      <TasksProvider value={backgroundService}>
        <NotificationsProvider value={notifications}>
          <SafeAreaProvider>
            <Provider store={store}>
              <PersistGate
                loading={null}
                onBeforeLift={onBeforeLift}
                persistor={persistor}>
                <NavigationContainer
                  linking={linkingConfig}
                  onReady={handleOnNavigationReady}
                  ref={navigationRef}>
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
      </TasksProvider>
    </ErrorBoundary>
  )
}

export default App
