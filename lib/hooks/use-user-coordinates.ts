import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userCoordinatesSelector } from 'store/selectors'
import { setLocationCoordinates } from 'store/actions/authenticated-user'
import type { DBCoordinateObject } from 'db/schemas/location'

const useUserCoordinates = (): [
  DBCoordinateObject,
  (newCoordinates: DBCoordinateObject) => void,
] => {
  const dispatch = useDispatch()
  const { latitude = null, longitude = null } =
    useSelector(userCoordinatesSelector) ?? {}
  const setNewLocationCoordinates = useCallback(
    (newCoordinates) => {
      dispatch(setLocationCoordinates(newCoordinates))
    },
    [dispatch],
  )
  return [
    {
      latitude,
      longitude,
    },
    setNewLocationCoordinates,
  ]
}

export default useUserCoordinates
