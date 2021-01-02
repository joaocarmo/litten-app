/**
 * @format
 * @flow
 */

import { useCallback, useMemo } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFavourites } from 'hooks'
import LittenDumbCard from 'components/litten-card/dumb'
import SearchHeaderResults from 'screens/home/search/header-results'
import SearchEmptyResults from 'screens/home/search/empty-results'
import { getFavouriteIndex } from 'utils/functions'
import {
  STRUCTURE_TAB_NAV_HEIGHT,
  UI_LITTEN_CARD_HEIGHT,
} from 'utils/constants'

const SearchResults: (args: any) => React$Node = ({
  handleOnRefresh,
  isLoading,
  isRefreshing,
  littens,
  handleTooltipRefresh,
  ...otherProps
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

  const renderItem = useCallback(
    ({ item }) => {
      const favouriteIndex = getFavouriteIndex(item, favourites)
      const isNotFavourite = favouriteIndex < 0

      const handleOnPressAction = () => {
        if (isNotFavourite) {
          addFavourite(item)
        } else {
          removeFavourite(favouriteIndex)
        }
      }

      return (
        <LittenDumbCard
          handleOnPressAction={handleOnPressAction}
          isFavourite={!isNotFavourite}
          item={item}
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
        {...otherProps}
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
