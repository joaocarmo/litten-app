/**
 * @format
 * @flow
 */

import { Keyboard, Pressable, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { UISearch } from 'ui-elements'
import ScreenTemplate from 'templates/screen'
import HomeSearchScreen from 'screens/home/search'
import { debugLog } from 'utils/dev'
import { translate } from 'utils/i18n'
import {
  RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
  SCREEN_HOME_FILTER,
  STRUCTURE_TEMPLATE_SCREEN_PADDING,
} from 'utils/constants'
import colors from 'styles/colors'

const HomeIndexScreen: (args: any) => React$Node = () => {
  const navigation = useNavigation()

  return (
    <ScreenTemplate
      header={
        <Pressable onPress={Keyboard.dismiss} style={styles.header}>
          <UISearch
            placeholder={translate('screens.searches.headerSearchPlaceholder')}
            style={styles.search}
            onSubmit={debugLog}
          />
          <Pressable
            onPress={() => navigation.navigate(SCREEN_HOME_FILTER)}
            style={styles.filtersContainer}>
            <Text style={styles.filtersText}>
              {translate('screens.searches.filters')}
            </Text>
          </Pressable>
        </Pressable>
      }>
      <HomeSearchScreen />
    </ScreenTemplate>
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
  search: {
    flex: 9,
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
    fontWeight: '600',
  },
})

export default HomeIndexScreen
