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
  SEARCH_FILTERS_REMOVE_SPECIES,
  SEARCH_FILTERS_REMOVE_TYPE,
} from 'store/actions/search-settings'
import { LITTEN_FILTER_LOCATION_RADIUS_DEFAULT } from 'utils/constants'

const initialState: SearchSettings = {
  filters: {
    littenSpecies: [],
    littenType: [],
    locationRadius: LITTEN_FILTER_LOCATION_RADIUS_DEFAULT,
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
      default:
        return draft
    }
  },
  initialState,
)

export default searchSettings
