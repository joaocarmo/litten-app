/**
 * @format
 * @flow
 */

import { StyleSheet, View } from 'react-native'
import { UIText } from 'ui-elements'
import { translate } from 'utils/i18n'

const ProfileReportScreen: (args: any) => React$Node = ({ type }) => (
  <View style={styles.reportContainer}>
    <UIText>{translate('easterEggs.placeholder')}</UIText>
  </View>
)

const styles = StyleSheet.create({
  reportContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default ProfileReportScreen
