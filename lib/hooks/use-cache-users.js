/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from 'store/actions/cache'
import { cacheUserSelector } from 'store/selectors'
import type { BasicUser } from 'model/types/user'
import type { ObjectById } from 'store/types'

const useCacheUsers = (): [
  ObjectById<BasicUser>,
  (user: BasicUser) => void,
] => {
  const dispatch = useDispatch()

  const users = useSelector(cacheUserSelector)

  const addCacheUser = useCallback((newUser) => dispatch(addUser(newUser)), [
    dispatch,
  ])

  return [users, addCacheUser]
}

export default useCacheUsers
