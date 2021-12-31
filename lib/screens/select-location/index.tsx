import { useCallback } from 'react'

import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import SelectLocationMapScreen from './map'

const SelectLocationIndexScreen = ({
  route: {
    params: { initialCoordinates, dispatchToAction },
  },
}) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const setLocationToAction = useCallback(
    (payload) =>
      dispatch({
        type: dispatchToAction,
        payload,
      }),
    [dispatch, dispatchToAction],
  )
  const onLocationChange = useCallback(
    (newLoc) => {
      if (dispatchToAction && newLoc) {
        setLocationToAction(newLoc)
      }

      navigation.goBack()
    },
    [dispatchToAction, navigation, setLocationToAction],
  )
  return (
    <SelectLocationMapScreen
      initialCoordinates={initialCoordinates}
      onLocationChange={onLocationChange}
    />
  )
}

export default SelectLocationIndexScreen
