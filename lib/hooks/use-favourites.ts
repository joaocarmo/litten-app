import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userSavedSelector } from '@store/selectors'
import {
  addFavouriteLitten,
  removeFavouriteLitten,
  removeFavouriteWithIndex,
} from '@store/actions/authenticated-user'
import type { BasicLitten } from '@model/types/litten'

const useFavourites = (): [
  BasicLitten[],
  (item: BasicLitten) => void,
  (arg0: { index?: number; litten?: BasicLitten }) => void,
] => {
  const dispatch = useDispatch()
  const { favourites } = useSelector(userSavedSelector)

  const addToFavourites = useCallback(
    (item) => {
      dispatch(addFavouriteLitten(item))
    },
    [dispatch],
  )

  const removeFromFavourites = useCallback(
    ({ index, litten }) => {
      if (Number.isInteger(index)) {
        dispatch(removeFavouriteWithIndex(+index))
      } else if (litten) {
        dispatch(removeFavouriteLitten(litten))
      }
    },
    [dispatch],
  )

  return [favourites, addToFavourites, removeFromFavourites]
}

export default useFavourites
