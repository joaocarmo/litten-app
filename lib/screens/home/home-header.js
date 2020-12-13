/**
 * @format
 * @flow
 */

import { Keyboard, Pressable, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
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

const HomeIndexHeader: (args: any) => React$Node = ({
  searchSettings: { filters },
}) => {
  const navigation = useNavigation()

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.header}>
      <SearchForm />
      <Pressable
        onPress={() => navigation.navigate(SCREEN_HOME_FILTER)}
        style={styles.filtersContainer}>
        <UIBadge number={getNumOfActiveFilters(filters)}>
          <Text style={styles.filtersText}>
            {translate('screens.searches.filters')}
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
    alignItems: 'flex-end',
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
    fontSize: 18,
    fontWeight: '700',
  },
})

export default HomeIndexHeader
