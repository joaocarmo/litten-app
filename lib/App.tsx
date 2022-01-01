import 'react-native-gesture-handler'
import { useCallback, useEffect, useState, useRef } from 'react'
import type { FC } from 'react'
import { useColorScheme } from 'react-native'
import BackgroundService from '@config/background-service'
import NotificationService from '@config/notification-service'
import { TasksProvider } from '@components/tasks'
import ThemeProvider from '@components/theme/provider'
import { NotificationsProvider } from '@components/notifications'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { MenuProvider } from 'react-native-popup-menu'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { PersistGate } from 'redux-persist/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider as StoreProvider } from 'react-redux'
import { store, persistor } from '@store'
import { useNotificationHandler } from '@hooks'
import Litten from '@root/Litten'
import ErrorBoundary from '@components/error-boundary'
import linkingConfig from '@config/navigation/linking'
import { isReadyRef, navigationRef } from '@config/navigation/root'
import { preSetup } from '@utils/setup'

const App = (): FC => {
  const [initializingStore, setInitializingStore] = useState(true)
  const scheme = useColorScheme()
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
  useEffect(
    () => () => {
      isReadyRef.current = false
    },
    [],
  )

  return (
    <StoreProvider store={store}>
      <PersistGate
        loading={null}
        onBeforeLift={onBeforeLift}
        persistor={persistor}
      >
        <ThemeProvider>
          <ErrorBoundary>
            <TasksProvider value={backgroundService}>
              <NotificationsProvider value={notifications}>
                <NavigationContainer
                  theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
                  linking={linkingConfig}
                  onReady={handleOnNavigationReady}
                  ref={navigationRef}
                >
                  <ActionSheetProvider>
                    <SafeAreaProvider>
                      <MenuProvider>
                        {!initializingStore && <Litten />}
                      </MenuProvider>
                    </SafeAreaProvider>
                  </ActionSheetProvider>
                </NavigationContainer>
              </NotificationsProvider>
            </TasksProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </PersistGate>
    </StoreProvider>
  )
}

export default App
