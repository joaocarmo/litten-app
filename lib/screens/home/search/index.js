/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  useCacheFeed,
  useSearchFilters,
  useSearchQuery,
  useUserCoordinates,
} from 'hooks'
import Litten from 'model/litten'
import Search from 'model/search'
import User from 'model/user'
import SearchResults from 'screens/home/search/results'
import { UILoader } from 'ui-elements'
import { distanceBetween, filterData } from 'utils/functions'
import { memoizedGetFromModel as getFromModel } from 'utils/network'
import { debugLog } from 'utils/dev'

const HomeSearchScreen: (args: any) => React$Node = () => {
  const [query] = useSearchQuery()
  const [filters] = useSearchFilters()
  const filterSettings = useMemo(() => ({ filters }), [filters])

  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastQuery, setLastQuery] = useState(query)
  const [listIsReady, setListIsReady] = useState(false)
  const [listIsScrollable, setListIsScrollable] = useState(false)
  const [allLittens, setAllLittens] = useCacheFeed()
  const [littens, setLittens] = useState([])

  const [userCoordinates] = useUserCoordinates()

  const searchRef = useRef(new Search(filterSettings))
  const search = searchRef.current

  const prepareData = useCallback(
    async (data) => {
      debugLog('[SEARCH] prepareData')
      const augmentedData = []

      for (const litten of data) {
        const littenModel = new Litten(litten)
        const userUid = littenModel.userUid
        const newUser = await getFromModel(User, userUid)
        const userInfo = newUser.toJSON()
        litten.distance = distanceBetween(
          littenModel.coordinates,
          userCoordinates,
        )
        litten.isFromOrganization = userInfo.isOrganization
        litten.user = userInfo
        augmentedData.push(litten)
      }

      return augmentedData
    },
    [userCoordinates],
  )

  const getFeed = useCallback(
    async ({ clear = false } = {}) => {
      debugLog('[SEARCH] getFeed with clear:', clear)

      const data = await search.getHomeFeed()
      const preparedData = await prepareData(data)
      const filteredData = filterData(preparedData, filterSettings)
      let newLittens = []
      let newAllLittens = []

      if (clear) {
        newLittens = filteredData
        newAllLittens = preparedData
      } else {
        newLittens = [...littens, ...filteredData]
        newAllLittens = [...allLittens, ...preparedData]
      }

      setAllLittens(newAllLittens)
      setLittens(newLittens)
      setListIsReady(true)
      setIsRefreshing(false)
      setIsLoadingMore(false)
      setIsLoading(false)
    },
    [allLittens, filterSettings, littens, prepareData, search, setAllLittens],
  )

  const getInitialFeed = useCallback(async () => {
    debugLog('[SEARCH] getInitialFeed')

    await getFeed()
  }, [getFeed])

  const refreshFeed = useCallback(async () => {
    debugLog('[SEARCH] refreshFeed')

    search.clearCursor()
    await getFeed({ clear: true })
  }, [getFeed, search])

  const handleOnRefresh = async () => {
    debugLog('[SEARCH] handleOnRefresh')

    setIsRefreshing(true)
    refreshFeed()
  }

  const handleOnScroll = () => {
    if (!listIsScrollable) {
      debugLog('[SEARCH] handleOnScroll')

      setListIsScrollable(true)
    }
  }

  const handleOnEndReached = () => {
    if (listIsScrollable && !isLoadingMore) {
      debugLog('[SEARCH] handleOnEndReached')

      setIsLoadingMore(true)
      getFeed()
    }
  }

  const handleTooltipRefresh = useCallback(() => {
    debugLog('[SEARCH] handleTooltipRefresh')

    setIsLoading(true)
    getInitialFeed()
  }, [getInitialFeed])

  const updateSearch = useCallback(
    async (newQuery) => {
      debugLog('[SEARCH] updateSearch', newQuery)

      search.query = newQuery
      setLastQuery(newQuery)

      setIsLoading(true)
      refreshFeed()
    },
    [refreshFeed, search],
  )

  useEffect(() => {
    if (!littens.length) {
      debugLog('[SEARCH] useEffect [initial]')

      getInitialFeed()
    } else {
      setLittens(filterData(allLittens, filterSettings))
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (listIsReady && lastQuery !== query) {
      debugLog('[SEARCH] useEffect with query:', query)

      updateSearch(query)
    }
  }, [lastQuery, listIsReady, query, updateSearch])

  useEffect(() => {
    if (!isLoading && !isRefreshing && !isLoadingMore) {
      debugLog('[SEARCH] useEffect filterData')

      setLittens(filterData(allLittens, filterSettings))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSettings])

  if (isLoading) {
    return <UILoader active={isLoading} />
  }

  return (
    <SearchResults
      littens={littens}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      isLoadingMore={isLoadingMore}
      handleOnRefresh={handleOnRefresh}
      handleTooltipRefresh={handleTooltipRefresh}
      onScroll={handleOnScroll}
      onEndReached={handleOnEndReached}
    />
  )
}

export default HomeSearchScreen
