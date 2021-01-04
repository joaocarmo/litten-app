/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userSavedSelector } from 'store/selectors'
import { addFavourite, removeFavourite } from 'store/actions/authenticated-user'
import type { BasicLitten } from 'model/types/litten'

const useFavourites = (): [
  BasicLitten[],
  (item: BasicLitten) => void,
  (index: number) => void,
] => {
  const dispatch = useDispatch()

  const { favourites } = useSelector(userSavedSelector)

  const addToFavourites = useCallback((item) => dispatch(addFavourite(item)), [
    dispatch,
  ])

  const removeFromFavourites = useCallback(
    (index) => dispatch(removeFavourite(index)),
    [dispatch],
  )

  return [favourites, addToFavourites, removeFromFavourites]
}

export default useFavourites
