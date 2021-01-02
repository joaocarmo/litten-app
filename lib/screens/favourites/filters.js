/**
 * @format
 * @flow
 */

import { useCallback, useMemo } from 'react'
import { Alert, FlatList, StyleSheet, View } from 'react-native'
import { useSavedFilters, useSearchFilters } from 'hooks'
import Empty from 'components/empty'
import { UIListItem } from 'ui-elements'
import { Cross as CrossIcon } from 'images/components/icons'
import { placeholderEmptyFavouriteSearches } from 'images'
import { STRUCTURE_TAB_NAV_HEIGHT } from 'utils/constants'
import { translate } from 'utils/i18n'

const FavouriteFiltersScreen: (args: any) => React$Node = () => {
  // eslint-disable-next-line no-unused-vars
  const [filters, _, removeFavouriteFilter] = useSavedFilters()
  // eslint-disable-next-line no-unused-vars
  const [__, setFilters] = useSearchFilters()

  const applyFilters = useCallback(
    (filter) => {
      setFilters(filter)
      Alert.alert(translate('screens.favourites.filtersApplied'))
    },
    [setFilters],
  )

  const renderItem = useCallback(
    ({ item: { key: name, ...filter }, index }) => (
      <UIListItem
        IconComponent={CrossIcon}
        iconPosition="right"
        onPressIcon={() => removeFavouriteFilter(index)}
        onPress={() => applyFilters(filter)}>
        {name}
      </UIListItem>
    ),
    [applyFilters, removeFavouriteFilter],
  )

  const ListEmptyComponent = useMemo(
    () => (
      <Empty
        imageSource={placeholderEmptyFavouriteSearches}
        header={translate('screens.favourites.emptyFiltersTitle')}>
        {translate('screens.favourites.emptyFiltersText')}
      </Empty>
    ),
    [],
  )

  return (
    <View style={styles.postsContainer}>
      <FlatList
        data={filters}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT,
  },
})

export default FavouriteFiltersScreen
