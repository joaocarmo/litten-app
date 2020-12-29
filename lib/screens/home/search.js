/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import Search from 'model/search'
import SearchResults from 'screens/home/search-results'
import { UILoader } from 'ui-elements'
import {
  SEARCH_INITIAL_NUM_TO_RENDER,
  UI_ELEMENT_BORDER_MARGIN,
} from 'utils/constants'
import { debugLog } from 'utils/dev'

const HomeSearchScreen: (args: any) => React$Node = ({
  authenticatedUser,
  searchSettings,
  ...otherProps
}) => {
  const { query, ...filterSettings } = searchSettings

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastQuery, setLastQuery] = useState(query)
  const [listIsReady, setListIsReady] = useState(false)
  const [listIsScrollable, setListIsScrollable] = useState(false)
  const [littens, setLittens] = useState([])

  const searchRef = useRef(new Search(filterSettings))
  const search = searchRef.current

  const getFeed = useCallback(
    async ({ clear = false } = {}) => {
      debugLog('[SEARCH] getFeed with clear:', clear)

      const data = await search.getHomeFeed()

      if (clear) {
        setLittens(data)
      } else {
        setLittens([...littens, ...data])
      }

      setListIsReady(true)
      setIsRefreshing(false)
      setIsLoading(false)
      setIsLoadingMore(false)
    },
    [littens, search],
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

  const handleTooltipRefresh = () => {
    debugLog('[SEARCH] handleTooltipRefresh')

    setIsLoading(true)
    getInitialFeed()
  }

  const updateSearch = useCallback(async () => {
    debugLog('[SEARCH] updateSearch', query)

    search.query = query
    setLastQuery(query)

    setIsLoading(true)
    refreshFeed()
  }, [query, refreshFeed, search])

  useEffect(() => {
    if (!littens.length) {
      debugLog('[SEARCH] useEffect [initial]')

      setIsLoading(true)
      getInitialFeed()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (listIsReady && lastQuery !== query) {
      debugLog('[SEARCH] useEffect with query:', query)

      updateSearch()
    }
  }, [lastQuery, listIsReady, query, updateSearch])

  const ListFooterComponent = useMemo(() => {
    if (isLoadingMore) {
      return (
        <UILoader active={isLoadingMore} containerStyle={styles.bottomLoader} />
      )
    }

    return null
  }, [isLoadingMore])

  if (isLoading) {
    return <UILoader active={isLoading} />
  }

  return (
    <SearchResults
      littens={littens}
      authenticatedUser={authenticatedUser}
      searchSettings={searchSettings}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      handleOnRefresh={handleOnRefresh}
      handleTooltipRefresh={handleTooltipRefresh}
      onScroll={handleOnScroll}
      onEndReached={handleOnEndReached}
      onEndReachedThreshold={0.1}
      initialNumToRender={SEARCH_INITIAL_NUM_TO_RENDER}
      ListFooterComponent={ListFooterComponent}
      windowSize={11}
      {...otherProps}
    />
  )
}

const styles = StyleSheet.create({
  bottomLoader: {
    paddingTop: UI_ELEMENT_BORDER_MARGIN * 2,
    paddingBottom: UI_ELEMENT_BORDER_MARGIN * 2,
  },
})

export default HomeSearchScreen
