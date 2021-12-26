/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchFiltersSelector } from 'store/selectors'
import { removeSpecies, setSpecies } from 'store/actions/search-settings'

const useSearchFiltersSpecies = (): [
  string[],
  (species: string) => void,
  (species: string) => void,
] => {
  const dispatch = useDispatch()

  const { littenSpecies } = useSelector(searchFiltersSelector)

  const addFilterSpecies = useCallback(
    (species) => {
      dispatch(setSpecies(species))
    },
    [dispatch],
  )

  const removeFilterSpecies = useCallback(
    (species) => {
      dispatch(removeSpecies(species))
    },
    [dispatch],
  )

  return [littenSpecies, addFilterSpecies, removeFilterSpecies]
}

export default useSearchFiltersSpecies
