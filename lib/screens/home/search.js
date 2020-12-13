/**
 * @format
 * @flow
 */

import { useEffect, useRef, useState } from 'react'
import Search from 'model/search'
import SearchResults from 'screens/home/search-results'
import { UILoader } from 'ui-elements'

const HomeSearchScreen: (args: any) => React$Node = ({
  authenticatedUser,
  searchSettings,
  ...otherProps
}) => {
  const { query, ...filterSettings } = searchSettings
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [littens, setLittens] = useState([])

  const searchRef = useRef(new Search(filterSettings))
  const search = searchRef.current

  useEffect(() => {
    const lastQuery = query

    updateSearch()

    return () => {
      if (lastQuery) {
        setLittens([])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const getFeed = async ({ clear = false } = {}) => {
    const data = await search.getHomeFeed()
    if (clear) {
      setLittens(data)
    } else {
      setLittens([...littens, ...data])
    }
  }

  const getInitialFeed = async () => {
    setIsLoading(true)
    await getFeed()
    setIsLoading(false)
  }

  const refreshFeed = async () => {
    setIsRefreshing(true)
    search.clearCursor()
    await getFeed({ clear: true })
    setIsRefreshing(false)
  }

  const handleOnRefresh = () => {
    refreshFeed()
  }

  const onEndReached = () => getFeed()

  const handleTooltipRefresh = () => {
    setIsLoading(true)
    getInitialFeed()
  }

  const updateSearch = async () => {
    search.query = query

    if (search.query) {
      refreshFeed()
    } else {
      getInitialFeed()
    }
  }

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
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      handleTooltipRefresh={handleTooltipRefresh}
      {...otherProps}
    />
  )
}

export default HomeSearchScreen
