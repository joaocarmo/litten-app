/**
 * @format
 * @flow
 */

import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import { UIHeader, UIText } from 'ui-elements'
import { STRUCTURE_TEMPLATE_SCREEN_PADDING } from 'utils/constants'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const Fallback: (args: any) => React$Node = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor={colors.lightGray} />
    <UIHeader>{translate('screens.maintenance.crashTitle')}</UIHeader>
    <UIText style={styles.centeredText}>
      {translate('screens.maintenance.crashDescription')}
    </UIText>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 2 * STRUCTURE_TEMPLATE_SCREEN_PADDING,
    paddingRight: 2 * STRUCTURE_TEMPLATE_SCREEN_PADDING,
    backgroundColor: colors.lightGray,
  },
  centeredText: {
    textAlign: 'center',
  },
})

export default Fallback
