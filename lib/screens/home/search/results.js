/**
 * @format
 * @flow
 */

import { useCallback, useMemo } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFavourites } from 'hooks'
import { UILoader } from 'ui-elements'
import LittenDumbCard from 'components/litten-card/dumb'
import SearchHeaderResults from 'screens/home/search/header-results'
import SearchEmptyResults from 'screens/home/search/empty-results'
import { getFavouriteIndex } from 'utils/functions'
import {
  SEARCH_INITIAL_NUM_TO_RENDER,
  STRUCTURE_TAB_NAV_HEIGHT,
  UI_ELEMENT_BORDER_MARGIN,
  UI_LITTEN_CARD_HEIGHT,
} from 'utils/constants'

const SearchResults: (args: any) => React$Node = ({
  handleOnRefresh,
  handleTooltipRefresh,
  initialNumToRender,
  isLoading,
  isLoadingMore,
  isRefreshing,
  littens,
  onEndReached,
  onEndReachedThreshold,
  onScroll,
}) => {
  const insets = useSafeAreaInsets()

  const [favourites, addFavourite, removeFavourite] = useFavourites()

  const hasItems = littens.length > 0

  const getItemLayout = useCallback(
    (data, index) => ({
      length: UI_LITTEN_CARD_HEIGHT,
      offset: UI_LITTEN_CARD_HEIGHT * index,
      index,
    }),
    [],
  )

  const ListEmptyComponent = useMemo(
    () => <SearchEmptyResults handleTooltipRefresh={handleTooltipRefresh} />,
    [handleTooltipRefresh],
  )

  const ListFooterComponent = useMemo(() => {
    if (isLoadingMore) {
      return (
        <UILoader active={isLoadingMore} containerStyle={styles.bottomLoader} />
      )
    }

    return null
  }, [isLoadingMore])

  const renderItem = useCallback(
    ({ item: { user, ...litten } }) => {
      const favouriteIndex = getFavouriteIndex(litten, favourites)
      const isNotFavourite = favouriteIndex < 0

      const handleOnPressAction = () => {
        if (isNotFavourite) {
          addFavourite(litten)
        } else {
          removeFavourite(favouriteIndex)
        }
      }

      return (
        <LittenDumbCard
          handleOnPressAction={handleOnPressAction}
          isFavourite={!isNotFavourite}
          item={{ litten, user }}
        />
      )
    },
    [addFavourite, favourites, removeFavourite],
  )

  return (
    <View style={styles.resultsContainer}>
      <FlatList
        data={littens}
        renderItem={renderItem}
        ListHeaderComponent={hasItems ? SearchHeaderResults : null}
        ListEmptyComponent={ListEmptyComponent}
        refreshing={isRefreshing}
        onRefresh={handleOnRefresh}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingBottom: STRUCTURE_TAB_NAV_HEIGHT + insets.bottom,
          },
        ]}
        getItemLayout={getItemLayout}
        bounces={hasItems}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        initialNumToRender={SEARCH_INITIAL_NUM_TO_RENDER}
        ListFooterComponent={ListFooterComponent}
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
  bottomLoader: {
    paddingTop: UI_ELEMENT_BORDER_MARGIN * 2,
    paddingBottom: UI_ELEMENT_BORDER_MARGIN * 2,
  },
})

export default SearchResults
