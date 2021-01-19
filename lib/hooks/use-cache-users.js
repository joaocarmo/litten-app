/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from 'store/actions/cache'
import { cacheUserSelector } from 'store/selectors'
import User from 'model/user'
import { memoizedGetFromModel as getFromModel } from 'utils/network'
import { debugLog } from 'utils/dev'
import type { BasicUser } from 'model/types/user'
import type { ObjectById } from 'store/types'

const areEqual = (left, right) =>
  Object.keys(left).length === Object.keys(right).length

const useCacheUsers = (): [
  (id: string) => BasicUser,
  ObjectById<BasicUser>,
  (user: BasicUser) => void,
] => {
  const dispatch = useDispatch()

  const users = useSelector(cacheUserSelector, areEqual)

  const addCacheUser = useCallback((newUser) => dispatch(addUser(newUser)), [
    dispatch,
  ])

  const getCacheUser = useCallback(
    async (id) => {
      if (id && !users[id]) {
        debugLog('[useCacheUsers] getUser for:', id)

        const user = await getFromModel(User, id)
        const userInfo = user.toJSON()
        addCacheUser(userInfo)

        return userInfo
      }

      return users[id] ?? {}
    },
    [addCacheUser, users],
  )

  return [getCacheUser, users, addCacheUser]
}

export default useCacheUsers
