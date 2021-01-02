/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userSavedSelector } from 'store/selectors'
import { setActivePosts, setPastPosts } from 'store/actions/authenticated-user'
import type { LittenObject } from 'store/types'

const useUserPosts = (): [
  LittenObject[],
  LittenObject[],
  (LittenObject[]) => void,
  (LittenObject[]) => void,
] => {
  const dispatch = useDispatch()

  const { activePosts, pastPosts } = useSelector(userSavedSelector)

  const setNewActivePosts = useCallback(
    (newPosts) => dispatch(setActivePosts(newPosts)),
    [dispatch],
  )

  const setNewPastPosts = useCallback(
    (newPosts) => dispatch(setPastPosts(newPosts)),
    [dispatch],
  )

  return [activePosts, pastPosts, setNewActivePosts, setNewPastPosts]
}

export default useUserPosts
