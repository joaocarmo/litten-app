/**
 * @format
 * @flow
 */

import { Image, StyleSheet, View } from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import { UIContainer, UIHeader, UIText } from 'ui-elements'
import { placeholderEmptyFavouriteSearches } from 'images'
import { translate } from 'utils/i18n'

const userSearches = 0

const CurrentSearches: () => React$Node = () => null

const FavouriteSearchesScreen: () => React$Node = () =>
  userSearches > 0 ? (
    <CurrentSearches />
  ) : (
    <View style={styles.emptyContainer}>
      <UIContainer style={styles.floatContainer}>
        <Image
          source={placeholderEmptyFavouriteSearches}
          style={styles.placeholderImage}
          resizeMode="contain"
        />
        <UIHeader style={styles.centeredText}>
          {translate('screens.favourites.emptySearchesTitle')}
        </UIHeader>
        <UIText style={styles.centeredText}>
          {translate('screens.favourites.emptySearchesText')}
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

export default FavouriteSearchesScreen
