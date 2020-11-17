/**
 * @format
 * @flow
 */

import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AppSettingsActions } from 'store/actions/app-settings'
import SelectLocationMapScreen from './map'

const mapStateToProps = () => ({})

const mapDispatchToProps = (
  dispatch,
  {
    route: {
      params: { dispatchToAction },
    },
  },
) =>
  bindActionCreators(
    {
      ...AppSettingsActions,
      setLocationToAction: (payload) => ({ type: dispatchToAction, payload }),
    },
    dispatch,
  )

const SelectLocationIndexScreen: (args: any) => React$Node = ({
  route: {
    params: { dispatchToAction },
  },
  setLocationToAction,
}) => {
  const navigation = useNavigation()

  const onLocationChange = (newLoc) => {
    if (dispatchToAction && newLoc) {
      setLocationToAction(newLoc)
    }
    navigation.goBack()
  }

  return <SelectLocationMapScreen onLocationChange={onLocationChange} />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectLocationIndexScreen)
