/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AppSettingsActions } from 'store/actions/app-settings'
import { useEffect, useState } from 'react'

const mapStateToProps = (state) => ({
  newLocation: state.appSettings.newLocation,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(AppSettingsActions, dispatch)

const SelectLocationIndexScreen: (args: any) => React$Node = ({
  newLocation,
  setNewLocation,
}) => {
  const [location, setLocation] = useState(null)

  useEffect(() => {
    setNewLocation(null)

    return () => setNewLocation(location)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectLocationIndexScreen)
