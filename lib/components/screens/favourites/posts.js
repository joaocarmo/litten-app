/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import { UIContainer, UIHeader, UIText } from 'ui-elements'
import { placeholderEmptyFavouritePosts } from 'images'
import { translate } from 'utils/i18n'

const userPosts = 0

const CurrentPosts: () => React$Node = () => null

const FavouritePostsScreen: () => React$Node = () =>
  userPosts > 0 ? (
    <CurrentPosts />
  ) : (
    <View style={styles.emptyContainer}>
      <UIContainer style={styles.floatContainer}>
        <Image
          source={placeholderEmptyFavouritePosts}
          style={styles.placeholderImage}
          resizeMode="contain"
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
