/**
 * @format
 * @flow
 */

import { usesMetricSystem } from 'react-native-localize'

import type { AuthenticatedUser, GenericActionObject } from 'store/types'

import {
  AUTH_USER_CLEAR_BASIC,
  AUTH_USER_SET_BASIC,
  AUTH_USER_CLEAR_EXTRA,
  AUTH_USER_SET_EXTRA,
  AUTH_USER_PREFERENCES_SET_DISTANCE,
} from 'store/actions/authenticated-user'
import { userSchema } from 'db/schemas/user'
import { MEASURE_KM, MEASURE_MI } from 'utils/constants'

export const initialState: AuthenticatedUser = {
  basic: null,
  extra: userSchema,
  preferences: {
    distanceUnit: usesMetricSystem() ? MEASURE_KM : MEASURE_MI,
  },
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
    case AUTH_USER_PREFERENCES_SET_DISTANCE:
      return {
        ...state,
        preferences: { ...state.preferences, distanceUnit: action.payload },
      }
    default:
      return state
  }
}

export default authenticatedUser
