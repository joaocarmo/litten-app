/**
 * @format
 * @flow
 */

import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SelectLocationMapScreen from './map'
import type { Dispatch, State } from 'store/types/state'
import type { GenericActionFn } from 'store/types'
import type { DBLocationObject } from 'db/schemas/location'

type OwnProps = {|
  route: {
    params: {
      dispatchToAction: string,
    },
  },
|}
type StateProps = {||}
type DispatchProps = {|
  +setLocationToAction: GenericActionFn<DBLocationObject>,
|}
type SelectLocationProps = {|
  ...OwnProps,
  ...StateProps,
  ...DispatchProps,
|}

const mapStateToProps = null

const mapDispatchToProps = (
  dispatch: Dispatch,
  {
    route: {
      params: { dispatchToAction },
    },
  },
): DispatchProps =>
  bindActionCreators(
    {
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

export default connect<
  SelectLocationProps,
  OwnProps,
  StateProps,
  DispatchProps,
  State,
  Dispatch,
>(
  mapStateToProps,
  mapDispatchToProps,
)(SelectLocationIndexScreen)
