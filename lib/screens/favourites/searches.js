/**
 * @format
 * @flow
 */

import { StyleSheet, View } from 'react-native'
import Empty from 'components/empty'
import { placeholderEmptyFavouriteSearches } from 'images'
import { STRUCTURE_TAB_NAV_HEIGHT } from 'utils/constants'
import { translate } from 'utils/i18n'

const userSearches = 0

const CurrentSearches: () => React$Node = () => null

const FavouriteSearchesScreen: () => React$Node = () => (
  <View style={styles.contentContainer}>
    {userSearches > 0 ? (
      <CurrentSearches />
    ) : (
      <Empty
        imageSource={placeholderEmptyFavouriteSearches}
        header={translate('screens.favourites.emptySearchesTitle')}>
        {translate('screens.favourites.emptySearchesText')}
      </Empty>
    )}
  </View>
)

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT,
  },
})
export default FavouriteSearchesScreen
