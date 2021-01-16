/**
 * @format
 * @flow
 */

import Toast from 'react-native-simple-toast'
import { useCallback, useMemo } from 'react'
import { FlatList, View } from 'react-native'
import { usePaddingBottom, useSavedFilters, useSearchFilters } from 'hooks'
import Empty from 'components/empty'
import { UIListItem } from 'ui-elements'
import { Cross as CrossIcon } from 'images/components/icons'
import { placeholderEmptyFavouriteSearches } from 'images'
import { contentContainerStyle, flexOne, topPadding } from 'styles/common'
import { translate } from 'utils/i18n'

const FavouriteFiltersScreen: (args: any) => React$Node = () => {
  const withPaddingBottom = usePaddingBottom()
  // eslint-disable-next-line no-unused-vars
  const [filters, _, removeFavouriteFilter] = useSavedFilters()
  // eslint-disable-next-line no-unused-vars
  const [__, setFilters] = useSearchFilters()

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
