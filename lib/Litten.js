/**
 * @format
 * @flow
 */

import auth from '@react-native-firebase/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthenticatedUserActions from 'store/actions/authenticated-user'
import React, { useEffect, useState } from 'react'
import SplashScreen from 'react-native-splash-screen'
import Onboard from 'components/onboard'
import Main from 'components/main'

import type {
  AppSettings,
  AuthenticatedUser,
  GenericActionFn,
} from 'store/types'

type LittenProps = {
  appSettings: AppSettings,
  authenticatedUser: AuthenticatedUser,
  initializingStore: boolean,
  setBasic: GenericActionFn,
}

const mapStateToProps = (state) => ({
  appSettings: state.appSettings,
  authenticatedUser: state.authenticatedUser,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(AuthenticatedUserActions, dispatch)

const Litten: (args: any) => React$Node = ({
  appSettings: { autoRedirectIfLoggedIn },
  authenticatedUser: { basic },
  initializingStore,
  setBasic,
}: LittenProps) => {
  // Set an initializing state whilst Firebase connects
  const [initializingFB, setInitializingFB] = useState(true)

  // Handle user state changes
  function onAuthStateChangeHandler(authUser) {
    setBasic(authUser)
    if (initializingFB) {
      setInitializingFB(false)
    }
  }

  useEffect(() => {
    const authStateSubscriber = auth().onAuthStateChanged(
      onAuthStateChangeHandler,
    )
    const userStateSubscriber = auth().onUserChanged(setBasic)
    // Unsubscribe on unmount
    return () => {
      authStateSubscriber()
      userStateSubscriber()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!initializingFB && !initializingStore) {
      SplashScreen.hide()
    }
  }, [initializingFB, initializingStore])

  if (initializingFB || initializingStore) {
    return null
  }

  if (!basic || !autoRedirectIfLoggedIn) {
    return <Onboard />
  }

  return <Main />
}

export default connect(mapStateToProps, mapDispatchToProps)(Litten)
