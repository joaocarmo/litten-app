/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLittens, setUsers } from 'store/actions/cache'
import { cacheSelector } from 'store/selectors'

const useCache = (type: string = ''): [any, (obj: any) => void] => {
  const dispatch = useDispatch()

  const cache = useSelector(cacheSelector)

  const { littens = {}, users = {} } = cache || {}

  const setCacheLittens = useCallback(
    (newLittens) => dispatch(setLittens(newLittens)),
    [dispatch],
  )

  const setCacheUsers = useCallback(
    (newUsers) => dispatch(setUsers(newUsers)),
    [dispatch],
  )

  if (type === 'littens') {
    return [littens, setCacheLittens]
  }

  if (type === 'users') {
    return [users, setCacheUsers]
  }

  return [cache, () => undefined]
}

export default useCache
