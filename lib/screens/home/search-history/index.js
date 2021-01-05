/**
 * @format
 * @flow
 */

import { useCallback, useMemo } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { usePaddingBottom, useSearchHistory, useSearchQuery } from 'hooks'
import { UIListItem, UIText } from 'ui-elements'
import { Cross as CrossIcon } from 'images/components/icons'
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
  const withPaddingBottom = usePaddingBottom()
  // eslint-disable-next-line no-unused-vars
  const [_query, setQuery] = useSearchQuery()
  const [searchHistory, setSearchHistory] = useSearchHistory()

  const selectSearchQuery = useCallback(
    (query) => {
      setQuery(query)
      setShowSearchHistory(false)
    },
    [setQuery, setShowSearchHistory],
  )

  const renderItem = useCallback(
    ({ item: query }) => (
      <UIListItem
        IconComponent={CrossIcon}
        iconPosition="right"
        onPressIcon={() => setSearchHistory(query, { remove: true })}
        onPress={() => selectSearchQuery(query)}>
        {query}
      </UIListItem>
    ),
    [selectSearchQuery, setSearchHistory],
  )

  const ListFooterComponent = useMemo(
    () => (
      <UIListItem onPress={() => setSearchHistory()}>
        {translate('screens.searches.searchHistoryTitleClear')}
      </UIListItem>
    ),
    [setSearchHistory],
  )

  if (!showSearchHistory) {
    return null
  }

  return (
    <View style={styles.searchHistoryContainer}>
      <UIText>{translate('screens.searches.searchHistoryTitle')}</UIText>
      <FlatList
        data={searchHistory}
        keyExtractor={(query) => query}
        renderItem={renderItem}
        ListFooterComponent={ListFooterComponent}
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={[styles.contentContainer, withPaddingBottom]}
      />
    </View>
  )
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
