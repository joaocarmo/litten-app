import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchQuerySelector } from '@store/selectors'
import { setQuery } from '@store/actions/search-settings'

const useSearchQuery = (): [string, (query: string) => void] => {
  const dispatch = useDispatch()
  const query = useSelector(searchQuerySelector)

  const setNewQuery = useCallback(
    (newQuery: string) => dispatch(setQuery(newQuery)),
    [dispatch],
  )

  return [query, setNewQuery]
}

export default useSearchQuery
