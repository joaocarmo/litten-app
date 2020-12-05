/**
 * @format
 * @flow
 */

import { FlatList, StyleSheet, View } from 'react-native'
import LittenCard from 'components/litten-card'
import SearchHeaderResults from 'screens/home/search-header-results'
import SearchEmptyResults from 'screens/home/search-empty-results'
import { getFavouriteIndex } from 'utils/functions'
import { STRUCTURE_TAB_NAV_HEIGHT } from 'utils/constants'

const SearchResults: (args: any) => React$Node = ({
  addFavourite,
  authenticatedUser,
  handleOnRefresh,
  isLoading,
  isRefreshing,
  littens,
  onEndReached,
  onEndReachedThreshold,
  removeFavourite,
  searchSettings,
  handleTooltipRefresh,
}) => {
  const {
    saved: { favourites },
  } = authenticatedUser
  const hasItems = littens.length > 0

  const handleOnPressAction = (item) => {
    const favouriteIndex = getFavouriteIndex(item, favourites)
    if (favouriteIndex < 0) {
      addFavourite(item)
    } else {
      removeFavourite(favouriteIndex)
    }
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
            handleOnPressAction={() => handleOnPressAction(item)}
          />
        )}
        ListHeaderComponent={hasItems ? SearchHeaderResults : null}
        ListEmptyComponent={
          <SearchEmptyResults handleTooltipRefresh={handleTooltipRefresh} />
        }
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
