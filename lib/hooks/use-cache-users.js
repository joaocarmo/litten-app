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

const useCacheUsers = (): [
  ObjectById<BasicUser>,
  (user: BasicUser) => void,
  (id: string) => BasicUser,
] => {
  const dispatch = useDispatch()

  const users = useSelector(cacheUserSelector)

  const addCacheUser = useCallback((newUser) => dispatch(addUser(newUser)), [
    dispatch,
  ])

  const getCacheUser = useCallback(
    async (id) => {
      if (!users[id]) {
        debugLog('[useCacheUsers] getUser for:', id)

        const user = await getFromModel(User, id)
        const userInfo = user.toJSON()
        addCacheUser(userInfo)

        return userInfo
      }

      return users[id]
    },
    [addCacheUser, users],
  )

  return [users, addCacheUser, getCacheUser]
}

export default useCacheUsers
