import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchHistorySelector } from '@store/selectors'
import {
  addSavedSearch,
  clearSavedSearch,
  removeSavedSearch,
} from '@store/actions/authenticated-user'

const areEqual = (left, right) => left.length === right.length

const useSearchHistory = (): [string[], (query: string) => void] => {
  const dispatch = useDispatch()
  const searchHistory = useSelector(searchHistorySelector, areEqual)
  const addSearchToHistory = useCallback(
    (query) => dispatch(addSavedSearch(query)),
    [dispatch],
  )
  const removeSearchFromHistory = useCallback(
    (query) => dispatch(removeSavedSearch(query)),
    [dispatch],
  )
  const clearSearchHistory = useCallback(
    () => dispatch(clearSavedSearch()),
    [dispatch],
  )
  const setSearchHistory = useCallback(
    (query, { remove = false } = {}) => {
      if (query) {
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
