/**
 * @format
 * @flow
 */

import { useSelector } from 'react-redux'
import { userCoordinatesSelector } from 'store/selectors'
import type { DBCoordinateObject } from 'db/schemas/location'

const useUserCoordinates = (): DBCoordinateObject => {
  let { latitude = null, longitude = null } =
    useSelector(userCoordinatesSelector) ?? {}

  return { latitude, longitude }
}

export default useUserCoordinates
