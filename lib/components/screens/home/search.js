/**
 * @format
 * @flow
 */

import React from 'react'
import {
  Image,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import { UIContainer, UIHeader, UIText } from 'ui-elements'
import { placeholderEmptySearches } from 'images'
import { translate } from 'utils/i18n'

const searchResults = 0

const SearchResults: () => React$Node = () => null

const HomeSearchScreen: () => React$Node = () => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    {searchResults > 0 ? (
      <SearchResults />
    ) : (
      <View style={styles.emptyContainer}>
        <UIContainer style={styles.floatContainer}>
          <Image
            source={placeholderEmptySearches}
            style={styles.placeholderImage}
            resizeMode="contain"
          />
          <UIHeader style={styles.centeredText}>
            {translate('screens.searches.emptyTitle')}
          </UIHeader>
          <UIText style={styles.centeredText}>
            {translate('screens.searches.emptyText')}
          </UIText>
        </UIContainer>
      </View>
    )}
  </TouchableWithoutFeedback>
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

export default HomeSearchScreen
