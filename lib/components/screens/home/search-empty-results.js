/**
 * @format
 * @flow
 */

import { StyleSheet, View } from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import { UIContainer, UIHeader, UIImage, UIText } from 'ui-elements'
import { placeholderEmptySearches } from 'images'
import { translate } from 'utils/i18n'

const SearchEmptyResults: (args: any) => React$Node = () => (
  <View style={styles.emptyContainer}>
    <UIContainer style={styles.floatContainer}>
      <UIImage
        source={placeholderEmptySearches}
        style={styles.placeholderImage}
      />
      <UIHeader style={styles.centeredText}>
        {translate('screens.searches.emptyTitle')}
      </UIHeader>
      <UIText style={styles.centeredText}>
        {translate('screens.searches.emptyText')}
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

export default SearchEmptyResults
