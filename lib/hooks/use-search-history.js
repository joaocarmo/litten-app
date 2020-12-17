/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchHistorySelector } from 'store/selectors'
import {
  addSavedSearch,
  clearSavedSearch,
  removeSavedSearch,
} from 'store/actions/authenticated-user'

const useSearchHistory = (): [string[], any] => {
  const dispatch = useDispatch()

  const searchHistory = useSelector(searchHistorySelector)

  const addSearchToHistory = useCallback(
    (query) => dispatch(addSavedSearch(query)),
    [dispatch],
  )

  const removeSearchFromHistory = useCallback(
    (index) => dispatch(removeSavedSearch(index)),
    [dispatch],
  )

  const clearSearchHistory = useCallback(() => dispatch(clearSavedSearch()), [
    dispatch,
  ])

  const setSearchHistory = useCallback(
    (action, { query, index } = {}) => {
      if (action === 'add') {
        addSearchToHistory(query)
      } else if (action === 'remove') {
        removeSearchFromHistory(index)
      } else if (action === 'clear') {
        clearSearchHistory()
      }
    },
    [addSearchToHistory, clearSearchHistory, removeSearchFromHistory],
  )

  return [searchHistory, setSearchHistory]
}

export default useSearchHistory
