/**
 * @format
 * @flow
 */

import produce from 'immer'
import type { SearchSettings, GenericActionObject } from 'store/types'
import {
  SEARCH_FILTERS_CLEAR,
  SEARCH_FILTERS_SET_LOCATION_RADIUS,
  SEARCH_FILTERS_SET_SPECIES,
  SEARCH_FILTERS_SET_TYPE,
} from 'store/actions/search-settings'

const initialState: SearchSettings = {
  filters: {
    littenSpecies: null,
    littenType: null,
    locationRadius: 0,
  },
}

const searchSettings = produce(
  (draft: SearchSettings, action: GenericActionObject) => {
    switch (action.type) {
      case SEARCH_FILTERS_CLEAR:
        return initialState
      case SEARCH_FILTERS_SET_LOCATION_RADIUS:
        draft.filters.locationRadius = action.payload
        break
      case SEARCH_FILTERS_SET_SPECIES:
        draft.filters.littenSpecies = action.payload
        break
      case SEARCH_FILTERS_SET_TYPE:
        draft.filters.littenType = action.payload
        break
      default:
        return draft
    }
  },
  initialState,
)

export default searchSettings
