/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import { UIContainer, UIHeader, UISearch, UIText } from 'ui-elements'
import ScreenTemplate from 'templates/screen'
import { translate } from 'utils/i18n'
import { placeholderEmptySearches } from 'images'
import colors from 'styles/colors'

const searchResults = 0

const SearchResults: () => React$Node = () => null

const HomeScreen: () => React$Node = () => (
  <ScreenTemplate
    header={
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.header}>
          <View style={styles.headerBar}>
            <UISearch
              placeholder={translate(
                'screens.searches.headerSearchPlaceholder',
              )}
              style={styles.search}
              onSubmit={console.log}
            />
            <Text style={styles.filters}>
              {translate('screens.searches.filters')}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    }
    scrollable={searchResults > 0}>
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
  </ScreenTemplate>
)

const styles = StyleSheet.create({
  header: {
    flex: 1,
    padding: 24,
    paddingBottom: 8,
    alignItems: 'flex-end',
  },
  headerBar: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  search: {
    flex: 1,
  },
  filters: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
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

export default HomeScreen
