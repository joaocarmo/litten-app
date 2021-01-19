/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLitten } from 'store/actions/cache'
import { cacheLittenSelector } from 'store/selectors'
import Litten from 'model/litten'
import { memoizedGetFromModel as getFromModel } from 'utils/network'
import { debugLog } from 'utils/dev'
import type { BasicLitten } from 'model/types/litten'
import type { ObjectById } from 'store/types'

const areEqual = (left, right) =>
  Object.keys(left).length === Object.keys(right).length

const useCacheLittens = (): [
  (id: string) => BasicLitten,
  ObjectById<BasicLitten>,
  (litten: BasicLitten) => void,
] => {
  const dispatch = useDispatch()

  const littens = useSelector(cacheLittenSelector, areEqual)

  const addCacheLitten = useCallback(
    (newLitten) => dispatch(addLitten(newLitten)),
    [dispatch],
  )

  const getCacheLitten = useCallback(
    async (id) => {
      if (id && !littens[id]) {
        debugLog('[useCacheLittens] getLitten for', id)

        const litten = await getFromModel(Litten, id)
        const littenInfo = litten.toJSON()
        addCacheLitten(littenInfo)

        return littenInfo
      }

      return littens[id] ?? {}
    },
    [addCacheLitten, littens],
  )

  return [getCacheLitten, littens, addCacheLitten]
}

export default useCacheLittens
