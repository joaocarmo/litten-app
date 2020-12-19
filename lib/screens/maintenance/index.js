/**
 * @format
 * @flow
 */

import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import { UIHeader, UIText } from 'ui-elements'
import Header from 'components/welcome/header'
import { STRUCTURE_TEMPLATE_SCREEN_PADDING } from 'utils/constants'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const MaintenanceScreen: () => React$Node = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor={colors.lightGray} />
    <View style={styles.header}>
      <Header />
    </View>
    <View style={styles.content}>
      <UIHeader>{translate('screens.maintenance.title')}</UIHeader>
      <UIText style={styles.centeredText}>
        {translate('screens.maintenance.description')}
      </UIText>
    </View>
    <View style={styles.bottom} />
  </SafeAreaView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 2 * STRUCTURE_TEMPLATE_SCREEN_PADDING,
    paddingRight: 2 * STRUCTURE_TEMPLATE_SCREEN_PADDING,
  },
  centeredText: {
    textAlign: 'center',
  },
  bottom: {
    flex: 1,
  },
})

export default MaintenanceScreen
