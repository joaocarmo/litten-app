/**
 * @format
 * @flow
 */

import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { UISearch } from 'ui-elements'
import ScreenTemplate from 'templates/screen'
import HomeSearchScreen from 'screens/home/search'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'
import { SCREEN_HOME_FILTER } from 'utils/constants'

const HomeIndexScreen: (args: any) => React$Node = () => {
  const navigation = useNavigation()

  return (
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
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate(SCREEN_HOME_FILTER)}>
                <Text style={styles.filters}>
                  {translate('screens.searches.filters')}
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableWithoutFeedback>
      }>
      <HomeSearchScreen />
    </ScreenTemplate>
  )
}

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
})

export default HomeIndexScreen
