/**
 * @format
 * @flow
 */

import { Dimensions } from 'react-native'

const { width: wWidth, height: wHeight } = Dimensions.get('window')

export const ANIMATE_TIME = 1000
export const ASPECT_RATIO = wWidth / wHeight
export const LATITUDE_DELTA = 0.03
export const LONGITUDE_DELTA = +(LATITUDE_DELTA * ASPECT_RATIO).toFixed(2)
export const initialRegion = {
  latitude: null,
  longitude: null,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
}
