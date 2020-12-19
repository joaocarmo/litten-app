/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AuthenticatedUserActions } from 'store/actions/authenticated-user'
import { useCallback, useEffect, useState } from 'react'
import SplashScreen from 'react-native-splash-screen'
import Auth from 'model/auth'
import Main from 'root/Main'
import Onboard from 'root/Onboard'
import MaintenanceScreen from 'screens/maintenance'
import { UILoader } from 'ui-elements'
import { setUpApp } from 'utils/setup'
import { getMaintenanceMode } from 'utils/network'
import type { Dispatch, State } from 'store/types/state'
import type {
  DispatchProps,
  LittenProps,
  OwnProps,
  StateProps,
} from 'root/types/litten'

const mapStateToProps = (state: State): StateProps => ({
  appSettings: state.appSettings,
  authenticatedUser: state.authenticatedUser,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(AuthenticatedUserActions, dispatch)

const Litten: (props: LittenProps) => React$Node = ({
  appSettings: { autoRedirectIfLoggedIn },
  authenticatedUser: { basic },
  clearBasic,
  clearExtra,
  initializingStore,
  setActivePosts,
  setBasic,
  setExtra,
  setLocationCoordinates,
  setPastPosts,
}: LittenProps) => {
  // Set an initializing state whilst Firebase connects
  const [initializingFB, setInitializingFB] = useState(true)
  const [isSettingUp, setIsSettingUp] = useState(false)
  const [inMaintenanceMode, setInMaintenanceMode] = useState(false)

  // Handle user state changes
  const onAuthStateChangeHandler = useCallback(async () => {
    if (initializingFB) {
      setInitializingFB(false)
    }
  }, [initializingFB])

  const onUserChangedHandler = useCallback(
    (authUser) => {
      if (authUser) {
        setBasic(authUser)
      } else {
        clearBasic()
        clearExtra()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const checkInMaintenanceMode = async () => {
    const maintenanceMode = await getMaintenanceMode()
    setInMaintenanceMode(maintenanceMode)
  }

  // Handle authentication state changes
  useEffect(() => {
    const authStateSubscriber = Auth._auth.onAuthStateChanged(
      onAuthStateChangeHandler,
    )
    const userStateSubscriber = Auth._auth.onUserChanged(onUserChangedHandler)

    checkInMaintenanceMode()

    // Unsubscribe on unmount
    return () => {
      authStateSubscriber()
      userStateSubscriber()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Refresh the user information
  const setupUser = async () => {
    if (basic && !isSettingUp) {
      setIsSettingUp(true)
      const {
        user,
        userActivePosts,
        userCoordinates,
        userInactivePosts,
      } = await setUpApp(basic)
      setExtra(user)
      setLocationCoordinates(userCoordinates)
      setActivePosts(userActivePosts)
      setPastPosts(userInactivePosts)
      setIsSettingUp(false)
    }
  }

  useEffect(() => {
    setupUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basic])

  useEffect(() => {
    if (!initializingFB && !initializingStore) {
      SplashScreen.hide()
    }
  }, [initializingFB, initializingStore])

  if (initializingFB || initializingStore) {
    return <UILoader active={initializingFB} />
  }

  if (inMaintenanceMode) {
    return <MaintenanceScreen />
  }

  if (!basic || !autoRedirectIfLoggedIn) {
    return <Onboard />
  }

  return <Main />
}

export default connect<
  LittenProps,
  OwnProps,
  StateProps,
  DispatchProps,
  State,
  Dispatch,
>(
  mapStateToProps,
  mapDispatchToProps,
)(Litten)
