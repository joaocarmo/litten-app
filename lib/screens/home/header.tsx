import { useCallback } from 'react'
import { Keyboard, Pressable, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSearchFilters, useTheme } from '@hooks'
import SearchForm from '@forms/search'
import { UIBadge } from '@ui-elements'
import { getNumOfActiveFilters } from '@utils/functions'
import { translate } from '@utils/i18n'
import {
  RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
  SCREEN_HOME_FILTER,
  STRUCTURE_TEMPLATE_SCREEN_PADDING,
} from '@utils/constants'
import type { HomeIndexHeaderNavigationProp } from '@utils/types/routes'

const HomeIndexHeader = ({
  showSearchHistory: searchHistoryVisisble,
  setShowSearchHistory,
}) => {
  const [filters] = useSearchFilters()
  const navigation = useNavigation<HomeIndexHeaderNavigationProp>()
  const { createStyles } = useTheme()

  const styles = createStyles((theme, typography) => ({
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
      color: theme.colors.textAlt,
      fontSize: typography.fontSize.xlarge,
      fontWeight: typography.fontWeight.bolder,
    },
  }))

  const showSearchHistory = useCallback(
    () => setShowSearchHistory(true),
    [setShowSearchHistory],
  )

  const hideSearchHistory = useCallback(
    () => setShowSearchHistory(false),
    [setShowSearchHistory],
  )

  const handleNextToSearchAction = useCallback(() => {
    if (searchHistoryVisisble) {
      hideSearchHistory()
      Keyboard.dismiss()
    } else {
      navigation.navigate(SCREEN_HOME_FILTER)
    }
  }, [searchHistoryVisisble, hideSearchHistory, navigation])

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.header}>
      <SearchForm
        showSearchHistory={showSearchHistory}
        hideSearchHistory={hideSearchHistory}
      />
      <Pressable
        onPress={handleNextToSearchAction}
        style={styles.filtersContainer}
      >
        <UIBadge
          number={searchHistoryVisisble ? 0 : getNumOfActiveFilters(filters)}
        >
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

export default HomeIndexHeader
