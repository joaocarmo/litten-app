/**
 * @format
 * @flow
 */

import { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import LittenCard from 'components/litten-card'
import SearchHeaderResults from './search-header-results'
import SearchEmptyResults from './search-empty-results'
import { STRUCTURE_TAB_NAV_HEIGHT } from 'utils/constants'

const SearchResults: (args: any) => React$Node = ({
  littens,
  authenticatedUser,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const hasItems = littens.length > 0

  const handleOnRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1200)
  }

  return (
    <View style={styles.resultsContainer}>
      <FlatList
        data={littens}
        renderItem={({ item }) => (
          <LittenCard litten={item} authenticatedUser={authenticatedUser} />
        )}
        keyExtractor={({ _id }) => _id}
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
