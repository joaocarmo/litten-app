import { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import SelectLocationMapScreen from '@screens/select-location/map'
import type { DBCoordinateObject, DBLocationObject } from '@db/schemas/location'

export type SelectLocationIndexScreenProps = {
  route: {
    params: {
      initialCoordinates: DBCoordinateObject
      dispatchToAction: string
    }
  }
}

const SelectLocationIndexScreen = ({
  route: {
    params: { initialCoordinates, dispatchToAction },
  },
}: SelectLocationIndexScreenProps) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const setLocationToAction = useCallback(
    (payload: DBLocationObject) =>
      dispatch({
        type: dispatchToAction,
        payload,
      }),
    [dispatch, dispatchToAction],
  )

  const onLocationChange = useCallback(
    (newLoc: DBLocationObject) => {
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
