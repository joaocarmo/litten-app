/**
 * @format
 * @flow
 */

import Toast from 'react-native-simple-toast'
import { useCallback, useMemo } from 'react'
import type { Node } from 'react'
import { FlatList, View } from 'react-native'
import { usePaddingBottom, useSavedFilters, useSearchFilters } from 'hooks'
import Empty from 'components/empty'
import { UIListItem } from 'ui-elements'
import { Cross as CrossIcon } from 'images/components/icons'
import { placeholderEmptyFavouriteSearches } from 'images'
import { contentContainerStyle, flexOne, topPadding } from 'styles/common'
import { translate } from 'utils/i18n'

const FavouriteFiltersScreen: (args: any) => Node = () => {
  const withPaddingBottom = usePaddingBottom()
  const [filters, , removeFavouriteFilter] = useSavedFilters()
  const [, setFilters] = useSearchFilters()

  const applyFilters = useCallback(
    (filter) => {
      setFilters(filter)
      Toast.show(translate('screens.favourites.filtersApplied'))
    },
    [setFilters],
  )

  const renderItem = useCallback(
    ({ item: { key: name, ...filter } }) => (
      <UIListItem
        IconComponent={CrossIcon}
        iconPosition="right"
        onPressIcon={() => removeFavouriteFilter(name)}
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
    <View style={flexOne}>
      <FlatList
        data={filters}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={[
          contentContainerStyle,
          withPaddingBottom,
          topPadding,
        ]}
        bounces={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default FavouriteFiltersScreen
