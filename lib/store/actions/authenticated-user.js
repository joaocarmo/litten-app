/**
 * @format
 * @flow
 */

import type { BasicAuthUser, GenericActionCreator } from 'store/types'
import type { DBUserObject } from 'db/schemas/user'
import type { DBCoordinateObject } from 'db/schemas/location'

export const AUTH_USER_CLEAR_BASIC = 'AUTH_USER_CLEAR_BASIC'
export const AUTH_USER_SET_BASIC = 'AUTH_USER_SET_BASIC'
export const AUTH_USER_CLEAR_EXTRA = 'AUTH_USER_CLEAR_EXTRA'
export const AUTH_USER_SET_EXTRA = 'AUTH_USER_SET_EXTRA'
export const AUTH_USER_SET_LOCATION_COORDINATES =
  'AUTH_USER_SET_LOCATION_COORDINATES'
export const AUTH_USER_PREFERENCES_SET_METRIC_UNITS =
  'AUTH_USER_PREFERENCES_SET_METRIC_UNITS'
export const AUTH_USER_PREFERENCES_SET_SHARE_METRICS =
  'AUTH_USER_PREFERENCES_SET_SHARE_METRICS'

export function clearBasic(): GenericActionCreator<void> {
  return {
    type: AUTH_USER_CLEAR_BASIC,
  }
}

export function setBasic(basicInfo: BasicAuthUser): GenericActionCreator<any> {
  return {
    type: AUTH_USER_SET_BASIC,
    payload: basicInfo,
  }
}

export function clearExtra(): GenericActionCreator<void> {
  return {
    type: AUTH_USER_CLEAR_EXTRA,
  }
}

export function setExtra(extraInfo: DBUserObject): GenericActionCreator<any> {
  return {
    type: AUTH_USER_SET_EXTRA,
    payload: extraInfo,
  }
}

export function setLocationCoordinates(
  coordinates: DBCoordinateObject,
): GenericActionCreator<any> {
  return {
    type: AUTH_USER_SET_LOCATION_COORDINATES,
    payload: coordinates,
  }
}

export function setMetricUnits(
  useMetricUnits: boolean,
): GenericActionCreator<boolean> {
  return {
    type: AUTH_USER_PREFERENCES_SET_METRIC_UNITS,
    payload: useMetricUnits,
  }
}

export function setShareMetrics(
  shareMetrics: boolean,
): GenericActionCreator<boolean> {
  return {
    type: AUTH_USER_PREFERENCES_SET_SHARE_METRICS,
    payload: shareMetrics,
  }
}

export const AuthenticatedUserActions = {
  clearBasic,
  setBasic,
  clearExtra,
  setExtra,
  setMetricUnits,
}
