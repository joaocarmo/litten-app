/**
 * @format
 * @flow
 */

export const SEARCH_FILTERS_CLEAR = 'SEARCH_FILTERS_CLEAR'
export const SEARCH_FILTERS_SET_LOCATION_RADIUS =
  'SEARCH_FILTERS_SET_LOCATION_RADIUS'
export const SEARCH_FILTERS_SET_SPECIES = 'SEARCH_FILTERS_SET_SPECIES'
export const SEARCH_FILTERS_SET_TYPE = 'SEARCH_FILTERS_SET_TYPE'

export function clearFilters() {
  return {
    type: SEARCH_FILTERS_CLEAR,
  }
}

export function setLocation(payload: number) {
  return {
    type: SEARCH_FILTERS_SET_LOCATION_RADIUS,
    payload,
  }
}

export function setSpecies(payload: string) {
  return {
    type: SEARCH_FILTERS_SET_SPECIES,
    payload,
  }
}

export function setType(payload: string) {
  return {
    type: SEARCH_FILTERS_SET_TYPE,
    payload,
  }
}
