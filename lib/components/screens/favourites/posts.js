/**
 * @format
 * @flow
 */

import { StyleSheet, View } from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import { UIContainer, UIHeader, UIImage, UIText } from 'ui-elements'
import { placeholderEmptyFavouritePosts } from 'images'
import { translate } from 'utils/i18n'

const userPosts = 0

const CurrentPosts: (args: any) => React$Node = () => null

const FavouritePostsScreen: (args: any) => React$Node = () =>
  userPosts > 0 ? (
    <CurrentPosts />
  ) : (
    <View style={styles.emptyContainer}>
      <UIContainer style={styles.floatContainer}>
        <UIImage
          source={placeholderEmptyFavouritePosts}
          style={styles.placeholderImage}
        />
        <UIHeader style={styles.centeredText}>
          {translate('screens.favourites.emptyPostsTitle')}
        </UIHeader>
        <UIText style={styles.centeredText}>
          {translate('screens.favourites.emptyPostsText')}
        </UIText>
      </UIContainer>
    </View>
  )

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatContainer: {
    alignItems: 'center',
  },
  centeredText: {
    textAlign: 'center',
  },
  placeholderImage: {
    height: vw(30),
    width: vw(30),
    margin: 20,
  },
})

export default FavouritePostsScreen
