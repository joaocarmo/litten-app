/**
 * @format
 * @flow
 */

import produce from 'immer'
import { usesMetricSystem } from 'react-native-localize'
import type { AuthenticatedUser } from 'store/types'
import {
  AUTH_USER_CLEAR_BASIC,
  AUTH_USER_SET_BASIC,
  AUTH_USER_CLEAR_EXTRA,
  AUTH_USER_SET_EXTRA,
  AUTH_USER_SET_LOCATION_COORDINATES,
  AUTH_USER_PREFERENCES_SET_METRIC_UNITS,
  AUTH_USER_PREFERENCES_SET_SHARE_METRICS,
} from 'store/actions/authenticated-user'
import { userSchema } from 'db/schemas/user'

export const initialState: AuthenticatedUser = {
  basic: null,
  extra: userSchema,
  preferences: {
    useMetricUnits: usesMetricSystem(),
    shareMetrics: true,
  },
}

const authenticatedUser = produce<AuthenticatedUser>(
  (draft: AuthenticatedUser, action: any) => {
    switch (action.type) {
      case AUTH_USER_CLEAR_BASIC:
        draft.basic = null
        break
      case AUTH_USER_SET_BASIC:
        draft.basic = action.payload
        break
      case AUTH_USER_CLEAR_EXTRA:
        draft.extra = userSchema
        break
      case AUTH_USER_SET_EXTRA:
        draft.extra = action.payload
        break
      case AUTH_USER_SET_LOCATION_COORDINATES:
        draft.extra.location.coordinates = action.payload
        break
      case AUTH_USER_PREFERENCES_SET_METRIC_UNITS:
        draft.preferences.useMetricUnits = action.payload
        break
      case AUTH_USER_PREFERENCES_SET_SHARE_METRICS:
        draft.preferences.shareMetrics = action.payload
        break
      default:
        return draft
    }
  },
  initialState,
)

export default authenticatedUser
