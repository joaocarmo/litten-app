/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userSavedSelector } from 'store/selectors'
import {
  addFavouriteFilter,
  removeFavouriteFilter,
} from 'store/actions/authenticated-user'
import type { SavedFilters, SearchFilters } from 'store/types'

const useSavedFilters = (): [
  SavedFilters[],
  (newFilter: SearchFilters) => void,
  (name: string) => void,
] => {
  const dispatch = useDispatch()

  const { filters } = useSelector(userSavedSelector)

  const addNewFavouriteFilter = useCallback(
    (newFilter) => dispatch(addFavouriteFilter(newFilter)),
    [dispatch],
  )

  const removeFromFavouriteFilters = useCallback(
    (name) => dispatch(removeFavouriteFilter(name)),
    [dispatch],
  )

  return [filters, addNewFavouriteFilter, removeFromFavouriteFilters]
}

export default useSavedFilters
