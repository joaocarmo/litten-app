/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useState } from 'react'
import {
  useActiveChats,
  useAppSettings,
  useAuthUser,
  useUserCoordinates,
  useUserInfo,
  useUserPosts,
} from 'hooks'
import SplashScreen from 'react-native-splash-screen'
import Auth from 'model/auth'
import Main from 'root/Main'
import Onboard from 'root/Onboard'
import MaintenanceScreen from 'screens/maintenance'
import { UILoader } from 'ui-elements'
import { setUpApp } from 'utils/setup'
import { getMaintenanceMode } from 'utils/network'
import { debugLog } from 'utils/dev'

export type LittenProps = {|
  initializingStore: boolean,
|}

const Litten: (props: LittenProps) => React$Node = ({
  initializingStore,
}: LittenProps) => {
  const [{ autoRedirectIfLoggedIn }] = useAppSettings()
  const [basic, setBasic, clearBasic] = useAuthUser()
  // eslint-disable-next-line no-unused-vars
  const [_, setExtra, clearExtra] = useUserInfo()
  // eslint-disable-next-line no-unused-vars
  const [__, ___, setActivePosts, setPastPosts] = useUserPosts()
  // eslint-disable-next-line no-unused-vars
  const [____, setLocationCoordinates] = useUserCoordinates()
  // eslint-disable-next-line no-unused-vars
  const [_____, setActiveChats] = useActiveChats()

  // Set an initializing state whilst Firebase connects
  const [isSettingUp, setIsSettingUp] = useState(true)
  const [inMaintenanceMode, setInMaintenanceMode] = useState(false)

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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSettingUp],
  )

  const checkInMaintenanceMode = useCallback(async () => {
    const maintenanceMode = await getMaintenanceMode()
    setInMaintenanceMode(maintenanceMode)
  }, [])

  // Handle authentication state changes
  useEffect(() => {
    const authStateSubscriber = Auth._auth.onAuthStateChanged(
      onAuthStateChangeHandler,
    )

    checkInMaintenanceMode()

    // Unsubscribe on unmount
    return () => {
      authStateSubscriber()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isSettingUp && !initializingStore) {
      SplashScreen.hide()
    }
  }, [isSettingUp, initializingStore])

  if (initializingStore || isSettingUp) {
    return <UILoader active />
  }

  if (inMaintenanceMode) {
    return <MaintenanceScreen />
  }

  if (!basic || !autoRedirectIfLoggedIn) {
    return <Onboard />
  }

  return <Main />
}

export default Litten
