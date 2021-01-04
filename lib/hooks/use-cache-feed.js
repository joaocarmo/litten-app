/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFeed } from 'store/actions/cache'
import { cacheFeedSelector } from 'store/selectors'
import type { LittenFeedObject } from 'store/types'

const useCacheFeed = (): [
  LittenFeedObject[],
  (littens: LittenFeedObject[]) => void,
] => {
  const dispatch = useDispatch()

  const feed = useSelector(cacheFeedSelector)

  const setNewFeed = useCallback((newFeed) => dispatch(setFeed(newFeed)), [
    dispatch,
  ])

  return [feed, setNewFeed]
}

export default useCacheFeed
