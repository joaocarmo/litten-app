/**
 * @format
 * @flow
 */

import type { AuthenticatedUser, GenericActionObject } from 'store/types'

import {
  AUTH_USER_CLEAR_BASIC,
  AUTH_USER_SET_BASIC,
  AUTH_USER_CLEAR_EXTRA,
  AUTH_USER_SET_EXTRA,
} from 'store/actions/authenticated-user'
import { userSchema } from 'db/schemas/user'

export const initialState: AuthenticatedUser = {
  basic: null,
  extra: userSchema,
}

function authenticatedUser(
  state: AuthenticatedUser = initialState,
  action: GenericActionObject,
) {
  switch (action.type) {
    case AUTH_USER_CLEAR_BASIC:
      return { ...state, basic: null }
    case AUTH_USER_SET_BASIC:
      return { ...state, basic: action.payload }
    case AUTH_USER_CLEAR_EXTRA:
      return { ...state, extra: userSchema }
    case AUTH_USER_SET_EXTRA:
      return { ...state, extra: action.payload }
    default:
      return state
  }
}

export default authenticatedUser
