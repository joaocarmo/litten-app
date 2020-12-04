/**
 * @format
 * @flow
 */

import { useEffect, useState } from 'react'
import Search from 'model/search'
import SearchResults from 'screens/home/search-results'
import { UILoader } from 'ui-elements'

const HomeSearchScreen: (args: any) => React$Node = ({
  authenticatedUser,
  searchSettings,
  ...otherProps
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [littens, setLittens] = useState([])
  const [search, setSearch] = useState(new Search(searchSettings))

  const getFeed = async ({ clear = false } = {}) => {
    const data = await search.getHomeFeed()
    if (clear) {
      setLittens(data)
    } else {
      setLittens([...littens, ...data])
    }
  }

  const getInitialFeed = async () => {
    await getFeed()
    setIsLoading(false)
  }

  useEffect(() => {
    getInitialFeed()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOnRefresh = async () => {
    setIsRefreshing(true)
    search.clearCursor()
    await getFeed({ clear: true })
    setIsRefreshing(false)
  }

  const onEndReached = () => getFeed()

  const handleTooltipRefresh = () => {
    setIsLoading(true)
    getInitialFeed()
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
