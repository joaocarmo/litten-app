/**
 * @format
 * @flow
 */

import { Keyboard, Pressable, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSearchFilters } from 'hooks'
import SearchForm from 'forms/search'
import { UIBadge } from 'ui-elements'
import { getNumOfActiveFilters } from 'utils/functions'
import { translate } from 'utils/i18n'
import {
  RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
  SCREEN_HOME_FILTER,
  STRUCTURE_TEMPLATE_SCREEN_PADDING,
} from 'utils/constants'
import colors from 'styles/colors'
import { fontSize, fontWeight } from 'styles/typography'

const HomeIndexHeader: (args: any) => React$Node = ({
  showSearchHistory: searchHistoryVisisble,
  setShowSearchHistory,
}) => {
  const [filters] = useSearchFilters()

  const navigation = useNavigation()

  const showSearchHistory = () => setShowSearchHistory(true)

  const hideSearchHistory = () => setShowSearchHistory(false)

  const handleNextToSearchAction = () => {
    if (searchHistoryVisisble) {
      hideSearchHistory()
      Keyboard.dismiss()
    } else {
      navigation.navigate(SCREEN_HOME_FILTER)
    }
  }

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.header}>
      <SearchForm
        showSearchHistory={showSearchHistory}
        hideSearchHistory={hideSearchHistory}
      />
      <Pressable
        onPress={handleNextToSearchAction}
        style={styles.filtersContainer}>
        <UIBadge
          number={searchHistoryVisisble ? 0 : getNumOfActiveFilters(filters)}>
          <Text style={styles.filtersText}>
            {searchHistoryVisisble
              ? translate('cta.cancel')
              : translate('screens.searches.filters')}
          </Text>
        </UIBadge>
      </Pressable>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: STRUCTURE_TEMPLATE_SCREEN_PADDING,
  },
  filtersContainer: {
    flexGrow: 1,
    minHeight: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
    minWidth: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersText: {
    color: colors.white,
    fontSize: fontSize.xlarge,
    fontWeight: fontWeight.bolder,
  },
})

export default HomeIndexHeader
