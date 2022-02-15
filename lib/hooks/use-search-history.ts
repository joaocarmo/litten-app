import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchHistorySelector } from '@store/selectors'
import {
  addSavedSearch,
  clearSavedSearch,
  removeSavedSearch,
} from '@store/actions/authenticated-user'
import { SavedSearch } from '@store/types'

type SetSearchOptions = {
  remove?: boolean
}

const areEqual = (left: SavedSearch[], right: SavedSearch[]) =>
  left.length === right.length

const useSearchHistory = (): [
  string[],
  (query?: string, options?: SetSearchOptions) => void,
] => {
  const dispatch = useDispatch()
  const searchHistory = useSelector(searchHistorySelector, areEqual)

  const addSearchToHistory = useCallback(
    (query: string) => dispatch(addSavedSearch(query)),
    [dispatch],
  )

  const removeSearchFromHistory = useCallback(
    (query: string) => dispatch(removeSavedSearch(query)),
    [dispatch],
  )

  const clearSearchHistory = useCallback(
    () => dispatch(clearSavedSearch()),
    [dispatch],
  )

  const setSearchHistory = useCallback(
    (query?: string, options?: SetSearchOptions) => {
      if (query) {
        const { remove = false } = options || {}

        if (remove) {
          removeSearchFromHistory(query)
        } else {
          addSearchToHistory(query)
        }
      } else {
        clearSearchHistory()
      }
    },
    [addSearchToHistory, clearSearchHistory, removeSearchFromHistory],
  )

  return [searchHistory, setSearchHistory]
}

export default useSearchHistory
