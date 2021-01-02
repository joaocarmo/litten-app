/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLitten } from 'store/actions/cache'
import { cacheLittenSelector } from 'store/selectors'
import type { BasicLitten } from 'model/types/litten'
import type { ObjectById } from 'store/types'

const useCacheLittens = (): [
  ObjectById<BasicLitten>,
  (litten: BasicLitten) => void,
] => {
  const dispatch = useDispatch()

  const littens = useSelector(cacheLittenSelector)

  const addCacheLitten = useCallback(
    (newLitten) => dispatch(addLitten(newLitten)),
    [dispatch],
  )

  return [littens, addCacheLitten]
}

export default useCacheLittens
