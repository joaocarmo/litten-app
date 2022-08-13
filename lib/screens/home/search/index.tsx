import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  useCacheFeed,
  useSearchFilters,
  useSearchQuery,
  useUserCoordinates,
} from '@hooks'
import User from '@model/user'
import Litten from '@model/litten'
import Search from '@model/search'
import SearchResults from '@screens/home/search/results'
import { UILoader } from '@ui-elements'
import { distanceBetween, filterData } from '@utils/functions'
import {
  RECURSION_LIMIT_SEARCH,
  SEARCH_INITIAL_NUM_TO_RENDER,
} from '@utils/constants'
import { debugLog } from '@utils/dev'

const HomeSearchScreen = () => {
  const [query] = useSearchQuery()
  const [filters] = useSearchFilters()
  const [allLittens, setAllLittens] = useCacheFeed()
  const [userCoordinates] = useUserCoordinates()
  const [littens, setLittens] = useState([])
  const [lastQuery, setLastQuery] = useState(query)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [listIsReady, setListIsReady] = useState(false)
  const [listIsScrollable, setListIsScrollable] = useState(false)

  const filterSettings = useMemo(
    () => ({
      filters,
    }),
    [filters],
  )
  const searchRef = useRef(new Search(filterSettings))
  const search = searchRef.current

  const prepareData = useCallback(
    async (data) => {
      debugLog('[SEARCH] prepareData')

      const augmentedData = []

      const usersToFetch = []

      for (const litten of data) {
        const user = new User({ id: litten.userUid })
        usersToFetch.push(user.get())
      }

      const users = await Promise.all(usersToFetch)

      for (const [littenIndex, litten] of data.entries()) {
        const littenModel = new Litten(litten)
        const userInfo = users[littenIndex]

        // START --- These are meant for client-side filtering
        litten.distance = distanceBetween(
          littenModel.coordinates,
          userCoordinates,
        )
        litten.isFromOrganization = userInfo.isOrganization
        // END ---

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
      let data = []
      let newData = []
      let newPreparedData = []
      let preparedData = []
      let filteredData = []
      let newFilteredData = []
      let limitInifity = 0

      do {
        // eslint-disable-next-line no-await-in-loop
        newData = await search.getHomeFeed()
        data = [...data, ...newData]
        // eslint-disable-next-line no-await-in-loop
        newPreparedData = await prepareData(newData)
        preparedData = [...preparedData, ...newPreparedData]
        newFilteredData = filterData(newPreparedData, filterSettings)
        filteredData = [...filteredData, ...newFilteredData]
        limitInifity += 1
        debugLog('[SEARCH] limitInifity', limitInifity)
      } while (
        newData.length > 0 &&
        newFilteredData.length < newData.length &&
        filteredData.length < SEARCH_INITIAL_NUM_TO_RENDER &&
        limitInifity < RECURSION_LIMIT_SEARCH
      )

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

      if (clear || data.length < SEARCH_INITIAL_NUM_TO_RENDER) {
        debugLog('[SEARCH] prepareData setHasMore', false)
        setHasMore(false)
      }
    },
    [allLittens, filterSettings, littens, prepareData, search, setAllLittens],
  )

  const refreshFeed = useCallback(async () => {
    debugLog('[SEARCH] refreshFeed')
    search.clearCursor()
    await getFeed({
      clear: true,
    })
  }, [getFeed, search])

  const handleOnRefresh = useCallback(async () => {
    debugLog('[SEARCH] handleOnRefresh')
    setIsRefreshing(true)
    refreshFeed()
  }, [refreshFeed])

  const handleOnScroll = useCallback(() => {
    if (!listIsScrollable) {
      debugLog('[SEARCH] handleOnScroll listIsScrollable', true)
      setListIsScrollable(true)
    }

    if (!hasMore) {
      debugLog('[SEARCH] handleOnScroll hasMore', true)
      setHasMore(true)
    }
  }, [hasMore, listIsScrollable])

  const handleOnEndReached = useCallback(() => {
    if (listIsScrollable && !isLoadingMore && hasMore) {
      debugLog('[SEARCH] handleOnEndReached')
      setIsLoadingMore(true)
      getFeed()
    }
  }, [getFeed, hasMore, isLoadingMore, listIsScrollable])

  const handleTooltipRefresh = useCallback(() => {
    debugLog('[SEARCH] handleTooltipRefresh')
    setIsLoading(true)
    refreshFeed()
  }, [refreshFeed])

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
      refreshFeed()
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
      const newFilteredData = filterData(allLittens, filterSettings)

      if (newFilteredData.length < SEARCH_INITIAL_NUM_TO_RENDER) {
        setIsRefreshing(true)
        refreshFeed()
      } else {
        setLittens(newFilteredData)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSettings])

  if (isLoading) {
    return <UILoader active={isLoading} />
  }

  return (
    <SearchResults
      littens={littens}
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
