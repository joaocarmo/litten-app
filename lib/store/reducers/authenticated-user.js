/**
 * @format
 * @flow
 */

import produce from 'immer'
import { usesMetricSystem } from 'react-native-localize'
import type { AuthenticatedUser } from 'store/types'
import {
  AUTH_USER_CLEAR_BASIC,
  AUTH_USER_CLEAR_EXTRA,
  AUTH_USER_PREFERENCES_SET_CONTACT_PREFERENCES,
  AUTH_USER_PREFERENCES_SET_METRIC_UNITS,
  AUTH_USER_PREFERENCES_SET_SHARE_METRICS,
  AUTH_USER_SAVED_ACTIVE_POSTS,
  AUTH_USER_SAVED_ADD_FAVOURITE_FILTER,
  AUTH_USER_SAVED_ADD_FAVOURITE,
  AUTH_USER_SAVED_PAST_POSTS,
  AUTH_USER_SAVED_REMOVE_FAVOURITE_FILTER,
  AUTH_USER_SAVED_REMOVE_FAVOURITE,
  AUTH_USER_SAVED_SEARCHES_ADD,
  AUTH_USER_SAVED_SEARCHES_CLEAR,
  AUTH_USER_SAVED_SEARCHES_REMOVE,
  AUTH_USER_SET_BASIC,
  AUTH_USER_SET_DISPLAY_NAME,
  AUTH_USER_SET_EMAIL,
  AUTH_USER_SET_EXTRA,
  AUTH_USER_SET_IS_ORGANIZATION,
  AUTH_USER_SET_LOCATION_COORDINATES,
  AUTH_USER_SET_LOCATION,
  AUTH_USER_SET_PHONE_NUMBER,
  AUTH_USER_SET_PHOTO_URL,
} from 'store/actions/authenticated-user'
import { locationSchema } from 'db/schemas/location'
import { userSchema } from 'db/schemas/user'

export const initialState: AuthenticatedUser = {
  basic: null,
  extra: userSchema,
  preferences: {
    useMetricUnits: usesMetricSystem(),
    shareMetrics: true,
  },
  saved: {
    activePosts: [],
    favourites: [],
    filters: [],
    pastPosts: [],
    searches: [],
  },
}

const authenticatedUser: (
  currentState: AuthenticatedUser | void,
  a: void,
  b: void,
  c: void,
  ...extraArgs: Array<any>
) => AuthenticatedUser = produce<AuthenticatedUser>(
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
      case AUTH_USER_SET_PHOTO_URL:
        draft.extra.photoURL = action.payload
        break
      case AUTH_USER_SET_DISPLAY_NAME:
        draft.extra.displayName = action.payload
        break
      case AUTH_USER_SET_IS_ORGANIZATION:
        draft.extra.isOrganization = action.payload
        break
      case AUTH_USER_SET_EMAIL:
        draft.extra.email = action.payload
        break
      case AUTH_USER_SET_PHONE_NUMBER:
        draft.extra.phoneNumber = action.payload
        break
      case AUTH_USER_SET_LOCATION:
        draft.extra.location = action.payload
        break
      case AUTH_USER_SET_LOCATION_COORDINATES:
        draft.extra.location = {
          ...locationSchema,
          ...draft.extra.location,
          coordinates: action.payload,
        }
        break
      case AUTH_USER_PREFERENCES_SET_CONTACT_PREFERENCES:
        let newContactPreferences = [...(draft.extra.contactPreferences || [])]
        if (newContactPreferences.includes(action.payload)) {
          newContactPreferences = newContactPreferences.filter(
            (value) => value !== action.payload,
          )
        } else {
          newContactPreferences.push(action.payload)
        }
        draft.extra.contactPreferences = newContactPreferences
        break
      case AUTH_USER_PREFERENCES_SET_METRIC_UNITS:
        draft.preferences.useMetricUnits = action.payload
        break
      case AUTH_USER_PREFERENCES_SET_SHARE_METRICS:
        draft.preferences.shareMetrics = action.payload
        break
      case AUTH_USER_SAVED_ACTIVE_POSTS:
        draft.saved.activePosts = action.payload
        break
      case AUTH_USER_SAVED_PAST_POSTS:
        draft.saved.pastPosts = action.payload
        break
      case AUTH_USER_SAVED_ADD_FAVOURITE:
        draft.saved.favourites.push(action.payload)
        break
      case AUTH_USER_SAVED_REMOVE_FAVOURITE:
        draft.saved.favourites.splice(action.index, 1)
        break
      case AUTH_USER_SAVED_ADD_FAVOURITE_FILTER:
        draft.saved.filters.push(action.payload)
        break
      case AUTH_USER_SAVED_REMOVE_FAVOURITE_FILTER:
        const filterIndex = draft.saved.filters.findIndex(
          ({ key }) => key === action.payload,
        )
        draft.saved.filters.splice(filterIndex, 1)
        break
      case AUTH_USER_SAVED_SEARCHES_ADD:
        draft.saved.searches.unshift(action.payload)
        const newSearches = [...new Set(draft.saved.searches)]
        draft.saved.searches = newSearches
        break
      case AUTH_USER_SAVED_SEARCHES_CLEAR:
        draft.saved.searches = []
        break
      case AUTH_USER_SAVED_SEARCHES_REMOVE:
        const searchIndex = draft.saved.searches.findIndex(
          (value) => value === action.payload,
        )
        draft.saved.searches.splice(searchIndex, 1)
        break
      default:
        return draft
    }
  },
  initialState,
)

export default authenticatedUser
