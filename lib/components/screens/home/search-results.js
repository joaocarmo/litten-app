/**
 * @format
 * @flow
 */

import { FlatList, StyleSheet, View } from 'react-native'
import LittenCard from 'components/litten-card'
import SearchHeaderResults from './search-header-results'
import SearchEmptyResults from './search-empty-results'
import { STRUCTURE_TAB_NAV_HEIGHT } from 'utils/constants'

const SearchResults: (args: any) => React$Node = ({
  authenticatedUser,
  handleOnRefresh,
  isLoading,
  isRefreshing,
  littens,
  onEndReached,
  onEndReachedThreshold,
  searchSettings,
}) => {
  const hasItems = littens.length > 0

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
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
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
