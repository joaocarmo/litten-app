import { useCallback } from 'react'
import useFavourites from 'hooks/use-favourites'
import { getFavouriteIndex } from 'utils/functions'
import type { BasicLitten } from 'model/types/litten'

const useFavouriteFn = (): [
  (litten: BasicLitten) => boolean,
  (litten: BasicLitten) => void,
  (litten: BasicLitten) => number,
] => {
  const [favourites, addToFavourites, removeFromFavourites] = useFavourites()
  const favouriteIndex = useCallback(
    (litten) => getFavouriteIndex(litten, favourites),
    [favourites],
  )
  const isFavourite = useCallback(
    (litten) => !(favouriteIndex(litten) < 0),
    [favouriteIndex],
  )
  const toggleFavourite = useCallback(
    (litten) => {
      const index = favouriteIndex(litten)

      if (index < 0) {
        addToFavourites(litten)
      } else {
        removeFromFavourites({
          litten,
        })
      }
    },
    [addToFavourites, favouriteIndex, removeFromFavourites],
  )
  return [isFavourite, toggleFavourite, favouriteIndex]
}

export default useFavouriteFn
