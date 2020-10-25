/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AuthenticatedUserActions } from 'store/actions/authenticated-user'
import { useEffect, useState } from 'react'
import Auth from 'model/auth'
import SplashScreen from 'react-native-splash-screen'
import Onboard from 'components/onboard'
import Main from 'components/main'
import type { Dispatch, State } from 'store/types/state'
import type {
  DispatchProps,
  LittenProps,
  OwnProps,
  StateProps,
} from './types/litten'

const mapStateToProps = (state: State): StateProps => ({
  appSettings: state.appSettings,
  authenticatedUser: state.authenticatedUser,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(AuthenticatedUserActions, dispatch)

const Litten: (props: LittenProps) => React$Node = ({
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
    const authStateSubscriber = Auth._auth.onAuthStateChanged(
      onAuthStateChangeHandler,
    )
    const userStateSubscriber = Auth._auth.onUserChanged(setBasic)
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
