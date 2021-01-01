/**
 * @format
 * @flow
 */

import type { GenericActionCreator, SearchFilters } from 'store/types'

export const SEARCH_FILTERS_RESET = 'SEARCH_FILTERS_RESET'
export const SEARCH_FILTERS_SET = 'SEARCH_FILTERS_SET'
export const SEARCH_FILTERS_SET_LOCATION_RADIUS =
  'SEARCH_FILTERS_SET_LOCATION_RADIUS'
export const SEARCH_FILTERS_SET_SPECIES = 'SEARCH_FILTERS_SET_SPECIES'
export const SEARCH_FILTERS_SET_TYPE = 'SEARCH_FILTERS_SET_TYPE'
export const SEARCH_FILTERS_SET_USER_TYPE = 'SEARCH_FILTERS_SET_USER_TYPE'
export const SEARCH_FILTERS_REMOVE_SPECIES = 'SEARCH_FILTERS_REMOVE_SPECIES'
export const SEARCH_FILTERS_REMOVE_TYPE = 'SEARCH_FILTERS_REMOVE_TYPE'
export const SEARCH_SET_QUERY = 'SEARCH_SET_QUERY'

export function resetFilters(): GenericActionCreator<void> {
  return {
    type: SEARCH_FILTERS_RESET,
  }
}

export function setFilters(
  payload: SearchFilters,
): GenericActionCreator<SearchFilters> {
  return {
    type: SEARCH_FILTERS_SET,
    payload,
  }
}

export function setQuery(payload: string): GenericActionCreator<string> {
  return {
    type: SEARCH_SET_QUERY,
    payload,
  }
}

export function setLocationRadius(
  payload: number,
): GenericActionCreator<number> {
  return {
    type: SEARCH_FILTERS_SET_LOCATION_RADIUS,
    payload,
  }
}

export function setSpecies(payload: string): GenericActionCreator<string> {
  return {
    type: SEARCH_FILTERS_SET_SPECIES,
    payload,
  }
}

export function setType(payload: string): GenericActionCreator<string> {
  return {
    type: SEARCH_FILTERS_SET_TYPE,
    payload,
  }
}

export function setUserType(payload: string): GenericActionCreator<string> {
  return {
    type: SEARCH_FILTERS_SET_USER_TYPE,
    payload,
  }
}

export function removeSpecies(payload: string): GenericActionCreator<string> {
  return {
    type: SEARCH_FILTERS_REMOVE_SPECIES,
    payload,
  }
}

export function removeType(payload: string): GenericActionCreator<string> {
  return {
    type: SEARCH_FILTERS_REMOVE_TYPE,
    payload,
  }
}

export const SearchSettingsActions = {
  removeSpecies,
  removeType,
  resetFilters,
  setFilters,
  setLocationRadius,
  setQuery,
  setSpecies,
  setType,
  setUserType,
}
