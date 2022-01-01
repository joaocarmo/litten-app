import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchFiltersSelector } from '@store/selectors'
import { setFilters, resetFilters } from '@store/actions/search-settings'
import type { SearchFilters } from '@store/types'

const useSearchFilters = (): [
  SearchFilters,
  (searchFilters: SearchFilters) => void,
  () => void,
] => {
  const dispatch = useDispatch()
  const searchFilters = useSelector(searchFiltersSelector)
  const setSearchFilters = useCallback(
    (newSearchFilters) => {
      dispatch(setFilters(newSearchFilters))
    },
    [dispatch],
  )
  const resetSearchFilters = useCallback(() => {
    dispatch(resetFilters())
  }, [dispatch])
  return [searchFilters, setSearchFilters, resetSearchFilters]
}

export default useSearchFilters
