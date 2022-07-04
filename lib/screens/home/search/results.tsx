import { useCallback, useMemo } from 'react'
import { FlatList, View } from 'react-native'
import {
  useFavouriteFn,
  usePaddingBottom,
  useTheme,
  useUserCoordinates,
} from '@hooks'
import BottomLoader, {
  ListFooterComponentStyle,
} from '@components/bottom-loader'
import Litten from '@model/litten'
import LittenDumbCard from '@components/litten-card/dumb'
import SearchHeaderResults from '@screens/home/search/header-results'
import SearchEmptyResults from '@screens/home/search/empty-results'
import { distanceBetween } from '@utils/functions'
import {
  SEARCH_INITIAL_NUM_TO_RENDER,
  UI_LITTEN_CARD_HEIGHT,
} from '@utils/constants'

const SearchResults = ({
  handleOnRefresh,
  handleTooltipRefresh,
  // initialNumToRender,
  isLoadingMore,
  isRefreshing,
  littens,
  onEndReached,
  // onEndReachedThreshold,
  onScroll,
}) => {
  const withPaddingBottom = usePaddingBottom()
  const [isFavourite, toggleFavourite] = useFavouriteFn()
  const hasItems = useMemo(() => littens.length > 0, [littens.length])
  const [userCoordinates] = useUserCoordinates()
  const {
    commonStyles: {
      commonStyles: { contentContainerStyle, flexOne },
    },
  } = useTheme()

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

  const ListFooterComponent = useMemo(
    () => <BottomLoader active={isLoadingMore} />,
    [isLoadingMore],
  )

  const renderItem = useCallback(
    ({ item: { user, ...litten } }) => {
      const littenModel = new Litten(litten)
      const distance = distanceBetween(littenModel.coordinates, userCoordinates)
      return (
        <LittenDumbCard
          onPressAction={toggleFavourite}
          isFavourite={isFavourite(litten)}
          item={{
            distance,
            litten,
            user,
          }}
        />
      )
    },
    [isFavourite, toggleFavourite, userCoordinates],
  )

  return (
    <View style={flexOne}>
      <FlatList
        data={littens}
        renderItem={renderItem}
        ListHeaderComponent={SearchHeaderResults}
        ListEmptyComponent={ListEmptyComponent}
        refreshing={isRefreshing}
        onRefresh={handleOnRefresh}
        contentContainerStyle={[contentContainerStyle, withPaddingBottom]}
        getItemLayout={getItemLayout}
        bounces={hasItems}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        initialNumToRender={SEARCH_INITIAL_NUM_TO_RENDER}
        ListFooterComponent={ListFooterComponent}
        ListFooterComponentStyle={ListFooterComponentStyle}
      />
    </View>
  )
}

export default SearchResults
