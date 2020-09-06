/**
 * @format
 * @flow
 */

import type { BasicAuthUser, GenericActionCreator } from 'store/types'
import type { DBUserObject } from 'db/schemas/user'

export const AUTH_USER_CLEAR_BASIC = 'AUTH_USER_CLEAR_BASIC'
export const AUTH_USER_SET_BASIC = 'AUTH_USER_SET_BASIC'
export const AUTH_USER_CLEAR_EXTRA = 'AUTH_USER_CLEAR_EXTRA'
export const AUTH_USER_SET_EXTRA = 'AUTH_USER_SET_EXTRA'
export const AUTH_USER_PREFERENCES_SET_METRIC_UNITS =
  'AUTH_USER_PREFERENCES_SET_METRIC_UNITS'

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

export function setMetricUnits(
  useMetricUnits: boolean,
): GenericActionCreator<boolean> {
  return {
    type: AUTH_USER_PREFERENCES_SET_METRIC_UNITS,
    payload: useMetricUnits,
  }
}

export const AuthenticatedUserActions = {
  clearBasic,
  setBasic,
  clearExtra,
  setExtra,
  setMetricUnits,
}
