/**
 * @format
 * @flow
 */

import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AppSettingsActions } from 'store/actions/app-settings'
import { useEffect, useState } from 'react'
import SelectLocationMapScreen from './map'

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

  const navigation = useNavigation()

  useEffect(() => {
    setNewLocation(null)

    return () => setNewLocation(location)
  }, [location, setNewLocation])

  const onLocationChange = (newLoc) => {
    setLocation(newLoc)
    navigation.goBack()
  }

  return <SelectLocationMapScreen onLocationChange={onLocationChange} />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectLocationIndexScreen)
