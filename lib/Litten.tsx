import { useCallback, useEffect, useState } from 'react'
import type { FC } from 'react'
import BootSplash from 'react-native-bootsplash'
import Toast from 'react-native-simple-toast'
import * as RootNavigation from '@config/navigation/root'
import {
  useActiveChats,
  useAppConfig,
  useAppSettings,
  useAuthUser,
  useConnectionStatus,
  useTasks,
  useUserCoordinates,
  useUserInfo,
  useUserPosts,
} from '@hooks'
import Auth from '@model/auth'
import Main from '@root/Main'
import Onboard from '@root/Onboard'
import BlockedScreen from '@screens/blocked'
import { UILoader } from '@ui-elements'
import { setUpApp } from '@utils/setup'
import { blockingValidator } from '@utils/functions'
import { translate } from '@utils/i18n'
import { debugLog } from '@utils/dev'

const Litten = (): FC => {
  const [{ autoRedirectIfLoggedIn }] = useAppSettings()
  const [basic, setBasic, clearBasic] = useAuthUser()
  const [, setExtra, clearExtra] = useUserInfo()
  const [, , setActivePosts, setPastPosts] = useUserPosts()
  const [, setLocationCoordinates] = useUserCoordinates()
  const [, setActiveChats] = useActiveChats()

  // Set an initializing state whilst Firebase connects
  const [isSettingUp, setIsSettingUp] = useState(true)
  const appConfig = useAppConfig()
  const [isAppBlocked, setIsAppblocked] = useState('')

  // Use the background service to run periodic tasks
  useTasks()
  // Show a toast when the connection is lost
  useConnectionStatus()

  // Refresh the user information
  const setupUser = useCallback(
    async (basicAuthUser) => {
      const {
        error,
        user,
        userActivePosts,
        userCoordinates,
        userInactivePosts,
      } = await setUpApp(basicAuthUser)

      if (error) {
        await Auth.signOut()

        setActiveChats([])
        clearBasic()
        clearExtra()

        RootNavigation.resetToRoot()

        Toast.show(translate('feedback.errorMessages.tryAgainLater'))
      } else {
        setBasic(basicAuthUser)
        setExtra(user)
        setLocationCoordinates(userCoordinates)
        setActivePosts(userActivePosts)
        setPastPosts(userInactivePosts)
        setIsSettingUp(false)
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  // Handle user state changes
  const onAuthStateChangeHandler = useCallback(
    (authUser) => {
      if (authUser) {
        debugLog('[LITTEN] signed in')

        setupUser(authUser)
      } else {
        debugLog('[LITTEN] signed out')

        setActiveChats([])
        clearBasic()
        clearExtra()
        setIsSettingUp(false)
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSettingUp],
  )

  // Respond to the remote config
  useEffect(() => {
    const appIsBlocked = blockingValidator(appConfig)
    setIsAppblocked(appIsBlocked)
  }, [appConfig])

  // Handle authentication state changes
  useEffect(() => {
    const authStateSubscriber = Auth.auth.onAuthStateChanged(
      onAuthStateChangeHandler,
    )
    // Unsubscribe on unmount
    return () => {
      authStateSubscriber()
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isSettingUp) {
      // Hide splash screen here
      BootSplash.hide({ fade: true })

      debugLog('[LITTEN] app is ready, hiding the splash screen')
    }
  }, [isSettingUp])

  if (isSettingUp) {
    return <UILoader active />
  }

  if (isAppBlocked) {
    return <BlockedScreen isAppBlocked={isAppBlocked} />
  }

  if (!basic || !autoRedirectIfLoggedIn) {
    return <Onboard />
  }

  return <Main />
}

export default Litten
