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

const useCacheLittens = (): [
  ObjectById<BasicLitten>,
  (litten: BasicLitten) => void,
  (id: string) => BasicLitten,
] => {
  const dispatch = useDispatch()

  const littens = useSelector(cacheLittenSelector)

  const addCacheLitten = useCallback(
    (newLitten) => dispatch(addLitten(newLitten)),
    [dispatch],
  )

  const getCacheLitten = useCallback(
    async (id) => {
      if (!littens[id]) {
        debugLog('[useCacheLittens] getLitten for', id)

        const litten = await getFromModel(Litten, id)
        const littenInfo = litten.toJSON()
        addCacheLitten(littenInfo)

        return littenInfo
      }

      return littens[id]
    },
    [addCacheLitten, littens],
  )

  return [littens, addCacheLitten, getCacheLitten]
}

export default useCacheLittens
