/**
 * @format
 * @flow
 */

import { useCallback, useMemo } from 'react'
import { FlatList, View } from 'react-native'
import { useFavourites, usePaddingBottom } from 'hooks'
import LittenSmartCard from 'components/litten-card/smart'
import Empty from 'components/empty'
import { placeholderEmptyFavouritePosts } from 'images'
import { contentContainerStyle, flexOne, topPadding } from 'styles/common'
import { translate } from 'utils/i18n'

const FavouritePostsScreen: (args: any) => React$Node = () => {
  const withPaddingBottom = usePaddingBottom()
  const [favourites, , removeFavourite] = useFavourites()

  const handleOnPressAction = useCallback(
    (litten) => {
      removeFavourite({ litten })
    },
    [removeFavourite],
  )

  const renderItem = useCallback(
    ({ item }) => (
      <LittenSmartCard litten={item} onPressAction={handleOnPressAction} />
    ),
    [handleOnPressAction],
  )

  const ListEmptyComponent = useMemo(
    () => (
      <Empty
        imageSource={placeholderEmptyFavouritePosts}
        header={translate('screens.favourites.emptyPostsTitle')}>
        {translate('screens.favourites.emptyPostsText')}
      </Empty>
    ),
    [],
  )

  return (
    <View style={flexOne}>
      <FlatList
        data={favourites}
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

export default FavouritePostsScreen
