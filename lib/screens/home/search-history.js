/**
 * @format
 * @flow
 */

import { FlatList, StyleSheet, View } from 'react-native'
import { useSearchHistory, useSearchQuery } from 'hooks'
import { UIListItem, UIText } from 'ui-elements'
import {
  DEVICE_WIDTH,
  STRUCTURE_TAB_NAV_HEIGHT,
  STRUCTURE_TEMPLATE_SCREEN_PADDING,
} from 'utils/constants'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const HomeSearchHistory: (args: any) => React$Node = ({
  setShowSearchHistory,
  showSearchHistory = false,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [_query, setQuery] = useSearchQuery()
  const [searchHistory, setSearchHistory] = useSearchHistory()

  const selectSearchQuery = (query) => {
    setQuery(query)
    setShowSearchHistory(false)
  }

  const renderItem = ({ item: query }) => (
    <UIListItem onPress={() => selectSearchQuery(query)}>{query}</UIListItem>
  )

  return showSearchHistory && searchHistory.length > 0 ? (
    <View style={styles.searchHistoryContainer}>
      <UIText>{translate('screens.searches.searchHistoryTitle')}</UIText>
      <FlatList
        data={searchHistory}
        keyExtractor={(query) => query}
        renderItem={renderItem}
        ListFooterComponent={
          <UIListItem onPress={() => setSearchHistory('clear')}>
            {translate('screens.searches.searchHistoryTitleClear')}
          </UIListItem>
        }
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  ) : null
}

const styles = StyleSheet.create({
  searchHistoryContainer: {
    position: 'absolute',
    height: '100%',
    minWidth: '100%',
    width: DEVICE_WIDTH,
    top: 0,
    left: 0,
    paddingLeft: STRUCTURE_TEMPLATE_SCREEN_PADDING,
    paddingRight: STRUCTURE_TEMPLATE_SCREEN_PADDING,
    zIndex: 1,
    backgroundColor: colors.lightGray,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT,
  },
})

export default HomeSearchHistory
