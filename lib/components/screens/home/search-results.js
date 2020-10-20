/**
 * @format
 * @flow
 */

import { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { UILoader } from 'ui-elements'
import LittenCard from 'components/litten-card'
import SearchHeaderResults from './search-header-results'
import SearchEmptyResults from './search-empty-results'
import { STRUCTURE_TAB_NAV_HEIGHT } from 'utils/constants'

const SearchResults: (args: any) => React$Node = ({
  authenticatedUser,
  isLoading,
  littens,
  searchSettings,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const hasItems = littens.length > 0

  const handleOnRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1200)
  }

  if (isLoading) {
    return <UILoader active={isLoading} />
  }

  return (
    <View style={styles.resultsContainer}>
      <FlatList
        data={littens}
        renderItem={({ item }) => (
          <LittenCard
            litten={item}
            authenticatedUser={authenticatedUser}
            searchSettings={searchSettings}
          />
        )}
        ListHeaderComponent={hasItems ? SearchHeaderResults : null}
        ListEmptyComponent={SearchEmptyResults}
        refreshing={isRefreshing}
        onRefresh={handleOnRefresh}
        contentContainerStyle={styles.contentContainer}
        bounces={hasItems}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  resultsContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT,
  },
})

export default SearchResults
