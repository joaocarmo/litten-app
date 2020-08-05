/**
 * @format
 * @flow
 */

import type { BasicAuthUser } from 'store/types'
import type { DBUserObject } from 'db/schemas/user'

export const AUTH_USER_CLEAR_BASIC = 'AUTH_USER_CLEAR_BASIC'
export const AUTH_USER_SET_BASIC = 'AUTH_USER_SET_BASIC'
export const AUTH_USER_CLEAR_EXTRA = 'AUTH_USER_CLEAR_EXTRA'
export const AUTH_USER_SET_EXTRA = 'AUTH_USER_SET_EXTRA'

export function clearBasic() {
  return {
    type: AUTH_USER_CLEAR_BASIC,
  }
}

export function setBasic(basicInfo: BasicAuthUser) {
  return {
    type: AUTH_USER_SET_BASIC,
    payload: basicInfo,
  }
}

export function clearExtra() {
  return {
    type: AUTH_USER_CLEAR_EXTRA,
  }
}

export function setExtra(extraInfo: DBUserObject) {
  return {
    type: AUTH_USER_SET_EXTRA,
    payload: extraInfo,
  }
}
