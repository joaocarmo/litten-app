/**
 * @format
 * @flow
 */

import { createSlice } from '@reduxjs/toolkit'
import type { SearchFilters, SearchSettings } from 'store/types'
import { LITTEN_FILTER_LOCATION_RADIUS_INITIAL } from 'utils/constants'

type PayloadAction<P = void, T = string> = {|
  payload: P,
  type: T,
|}

const initialState: SearchSettings = {
  query: '',
  filters: {
    littenSpecies: [],
    littenType: [],
    locationRadius: LITTEN_FILTER_LOCATION_RADIUS_INITIAL,
    userType: '',
  },
}

const searchSettingsSlice: any = createSlice<SearchSettings>({
  name: 'searchSettings',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload
    },
    resetFilters(state, action: PayloadAction<void>) {
      state.filters = initialState.filters
    },
    setFilters(state, action: PayloadAction<SearchFilters>) {
      state.filters = action.payload
    },
    setLocationRadius(state, action: PayloadAction<number>) {
      state.filters.locationRadius = action.payload
    },
    setSpecies(state, action: PayloadAction<string>) {
      state.filters.littenSpecies.push(action.payload)
    },
    setType(state, action: PayloadAction<string>) {
      state.filters.littenType.push(action.payload)
    },
    removeSpecies(state, action: PayloadAction<string>) {
      state.filters.littenSpecies.splice(
        state.filters.littenSpecies.indexOf(action.payload),
        1,
      )
    },
    removeType(state, action: PayloadAction<string>) {
      state.filters.littenType.splice(
        state.filters.littenType.indexOf(action.payload),
        1,
      )
    },
    setUserType(state, action: PayloadAction<string>) {
      state.filters.userType = action.payload
    },
  },
})

export const {
  removeSpecies,
  removeType,
  resetFilters,
  setFilters,
  setLocationRadius,
  setQuery,
  setSpecies,
  setType,
  setUserType,
} = searchSettingsSlice.actions

export default searchSettingsSlice.reducer
