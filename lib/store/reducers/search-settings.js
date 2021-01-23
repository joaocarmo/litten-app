/**
 * @format
 * @flow
 */

import produce from 'immer'
import type { SearchSettings } from 'store/types'
import {
  SEARCH_FILTERS_REMOVE_SPECIES,
  SEARCH_FILTERS_REMOVE_TYPE,
  SEARCH_FILTERS_RESET,
  SEARCH_FILTERS_SET_LOCATION_RADIUS,
  SEARCH_FILTERS_SET_SPECIES,
  SEARCH_FILTERS_SET_TYPE,
  SEARCH_FILTERS_SET_USER_TYPE,
  SEARCH_FILTERS_SET,
  SEARCH_SET_QUERY,
} from 'store/actions/search-settings'
import { LITTEN_FILTER_LOCATION_RADIUS_DEFAULT } from 'utils/constants'

const initialState: SearchSettings = {
  query: '',
  filters: {
    littenSpecies: [],
    littenType: [],
    locationRadius: LITTEN_FILTER_LOCATION_RADIUS_DEFAULT,
    userType: '',
  },
}

const searchSettings: (
  currentState: SearchSettings | void,
  a: void,
  b: void,
  c: void,
  ...extraArgs: Array<any>
) => SearchSettings = produce<SearchSettings>(
  (draft: SearchSettings, action: any) => {
    switch (action.type) {
      case SEARCH_SET_QUERY:
        draft.query = action.payload
        break
      case SEARCH_FILTERS_RESET:
        draft.filters = initialState.filters
        break
      case SEARCH_FILTERS_SET:
        draft.filters = action.payload
        break
      case SEARCH_FILTERS_SET_LOCATION_RADIUS:
        draft.filters.locationRadius = action.payload
        break
      case SEARCH_FILTERS_SET_SPECIES:
        draft.filters.littenSpecies.push(action.payload)
        break
      case SEARCH_FILTERS_SET_TYPE:
        draft.filters.littenType.push(action.payload)
        break
      case SEARCH_FILTERS_REMOVE_SPECIES:
        draft.filters.littenSpecies.splice(
          draft.filters.littenSpecies.indexOf(action.payload),
          1,
        )
        break
      case SEARCH_FILTERS_REMOVE_TYPE:
        draft.filters.littenType.splice(
          draft.filters.littenType.indexOf(action.payload),
          1,
        )
        break
      case SEARCH_FILTERS_SET_USER_TYPE:
        draft.filters.userType = action.payload
        break
      default:
        return draft
    }
  },
  initialState,
)

export default searchSettings
