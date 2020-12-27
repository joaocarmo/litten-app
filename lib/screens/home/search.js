/**
 * @format
 * @flow
 */

import { useEffect, useRef, useState } from 'react'
import Search from 'model/search'
import SearchResults from 'screens/home/search-results'
import { UILoader } from 'ui-elements'
import { SEARCH_INITIAL_NUM_TO_RENDER } from 'utils/constants'
import { debugLog } from 'utils/dev'

const HomeSearchScreen: (args: any) => React$Node = ({
  authenticatedUser,
  searchSettings,
  ...otherProps
}) => {
  const { query, ...filterSettings } = searchSettings
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [littens, setLittens] = useState([])

  const searchRef = useRef(new Search(filterSettings))
  const search = searchRef.current

  const getFeed = async ({ clear = false } = {}) => {
    debugLog('[SEARCH] getFeed', clear)

    const data = await search.getHomeFeed()

    if (clear) {
      setLittens(data)
    } else {
      setLittens([...littens, ...data])
    }
  }

  const getInitialFeed = async () => {
    debugLog('[SEARCH] getInitialFeed')

    setIsLoading(true)
    await getFeed()
    setIsLoading(false)
  }

  const refreshFeed = async () => {
    debugLog('[SEARCH] refreshFeed')

    setIsRefreshing(true)
    search.clearCursor()
    await getFeed({ clear: true })
    setIsRefreshing(false)
    setIsLoading(false)
  }

  const handleOnRefresh = async () => {
    debugLog('[SEARCH] handleOnRefresh')

    refreshFeed()
  }

  const onEndReached = async () => {
    debugLog('[SEARCH] onEndReached')

    if (!isRefreshing) {
      getFeed()
    }
  }

  const handleTooltipRefresh = async () => {
    debugLog('[SEARCH] handleTooltipRefresh')

    getInitialFeed()
  }

  const updateSearch = async () => {
    debugLog('[SEARCH] updateSearch', query)

    search.query = query

    setIsLoading(true)
    refreshFeed()
  }

  useEffect(() => {
    debugLog('[SEARCH] useEffect', query)

    const lastQuery = query

    updateSearch()

    return () => {
      if (lastQuery) {
        debugLog('[SEARCH] clearQuery', lastQuery)
        setLittens([])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

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
      onEndReached={onEndReached}
      initialNumToRender={SEARCH_INITIAL_NUM_TO_RENDER}
      {...otherProps}
    />
  )
}

export default HomeSearchScreen
