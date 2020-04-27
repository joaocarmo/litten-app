/**
 * @format
 * @flow strict-local
 */

import auth from '@react-native-firebase/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthenticatedUserActions from 'store/actions/authenticated-user'
import React, { useEffect, useState } from 'react'
import SplashScreen from 'react-native-splash-screen'
import Onboard from 'components/onboard'
import Main from 'components/main'

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticatedUser,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(AuthenticatedUserActions, dispatch)

const Litten: () => React$Node = ({
  initializingStore,
  authenticatedUser: { basic },
  setBasic,
}) => {
  // Set an initializing state whilst Firebase connects
  const [initializingFB, setInitializingFB] = useState(true)

  // Handle user state changes
  function onAuthStateChanged(authUser) {
    setBasic(authUser)
    if (initializingFB) {
      setInitializingFB(false)
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    // Unsubscribe on unmount
    return subscriber
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

  if (!basic) {
    return <Onboard />
  }

  return <Main />
}

export default connect(mapStateToProps, mapDispatchToProps)(Litten)
