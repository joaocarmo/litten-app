/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import { UIContainer, UIHeader, UIText } from 'ui-elements'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import { translate } from 'utils/i18n'
import { placeholderEmptyFavouritePosts } from 'images'

const userFavourites = 0

const CurrentFavourites: () => React$Node = () => null

const FavouritesScreen: () => React$Node = () => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate>
        {translate('screens.favourites.title')}
      </ScreenSimpleHeaderTemplate>
    }
    scrollable={userFavourites > 0}>
    {userFavourites > 0 ? (
      <CurrentFavourites />
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
    )}
  </ScreenTemplate>
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

export default FavouritesScreen
