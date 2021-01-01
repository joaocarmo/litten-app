/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useFavourites } from 'hooks'
import LittenCard from 'components/litten-card'
import Empty from 'components/empty'
import { placeholderEmptyFavouritePosts } from 'images'
import { getFavouriteIndex } from 'utils/functions'
import { STRUCTURE_TAB_NAV_HEIGHT } from 'utils/constants'
import { translate } from 'utils/i18n'

const FavouritePostsScreen: (args: any) => React$Node = () => {
  // eslint-disable-next-line no-unused-vars
  const [favourites, addFavourite, removeFavourite] = useFavourites()

  const handleOnPressAction = useCallback(
    (item) => removeFavourite(getFavouriteIndex(item, favourites)),
    [favourites, removeFavourite],
  )

  const renderItem = useCallback(
    ({ item }) => (
      <LittenCard
        litten={item}
        handleOnPressAction={() => handleOnPressAction(item)}
      />
    ),
    [handleOnPressAction],
  )

  return (
    <View style={styles.postsContainer}>
      <FlatList
        data={favourites}
        renderItem={renderItem}
        ListEmptyComponent={
          <Empty
            imageSource={placeholderEmptyFavouritePosts}
            header={translate('screens.favourites.emptyPostsTitle')}>
            {translate('screens.favourites.emptyPostsText')}
          </Empty>
        }
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

export default FavouritePostsScreen
