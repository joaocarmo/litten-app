import { useCallback, useMemo } from 'react'
import useFavourites from 'hooks/use-favourites'
import { getFavouriteIndex } from 'utils/functions'
import type { BasicLitten } from 'model/types/litten'

const useFavourite = (litten: BasicLitten): [boolean, () => void, number] => {
  const [favourites, addToFavourites, removeFromFavourites] = useFavourites()
  const favouriteIndex = useMemo(
    () => getFavouriteIndex(litten, favourites),
    [favourites, litten],
  )
  const isFavourite = useMemo(() => !(favouriteIndex < 0), [favouriteIndex])
  const toggleFavourite = useCallback(() => {
    if (favouriteIndex < 0) {
      addToFavourites(litten)
    } else {
      removeFromFavourites({
        litten,
      })
    }
  }, [addToFavourites, favouriteIndex, litten, removeFromFavourites])
  return [isFavourite, toggleFavourite, favouriteIndex]
}

export default useFavourite
