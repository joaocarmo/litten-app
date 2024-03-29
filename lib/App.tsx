import 'react-native-get-random-values'
import 'react-native-gesture-handler'
import { useCallback, useState, useRef } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { MenuProvider } from 'react-native-popup-menu'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { NavigationContainer } from '@react-navigation/native'
import { store, persistor } from '@store'
import NotificationService from '@config/notification-service'
import ThemeProvider from '@components/theme/provider'
import { NotificationsProvider } from '@components/notifications'
import { useNotificationHandler } from '@hooks'
import Litten from '@root/Litten'
import ErrorBoundary from '@components/error-boundary'
import linkingConfig from '@config/navigation/linking'
import { navigationRef } from '@config/navigation/root'
import { preSetup } from '@utils/setup'

const App = () => {
  const [initializingStore, setInitializingStore] = useState(true)
  const [onNotification] = useNotificationHandler()
  const notificationService = useRef(new NotificationService(onNotification))

  const onBeforeLift = useCallback(async () => {
    await preSetup()

    setInitializingStore(false)
  }, [])

  return (
    <StoreProvider store={store}>
      <PersistGate
        loading={null}
        onBeforeLift={onBeforeLift}
        persistor={persistor}
      >
        <ThemeProvider>
          <ErrorBoundary>
            <NotificationsProvider value={notificationService.current}>
              <NavigationContainer linking={linkingConfig} ref={navigationRef}>
                <ActionSheetProvider>
                  <SafeAreaProvider>
                    <MenuProvider>
                      {!initializingStore && <Litten />}
                    </MenuProvider>
                  </SafeAreaProvider>
                </ActionSheetProvider>
              </NavigationContainer>
            </NotificationsProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </PersistGate>
    </StoreProvider>
  )
}

export default App
