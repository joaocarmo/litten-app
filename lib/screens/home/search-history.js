/**
 * @format
 * @flow
 */

import { StyleSheet, View } from 'react-native'
import { UIText } from 'ui-elements'
import { DEVICE_WIDTH } from 'utils/constants'
import colors from 'styles/colors'

const HomeSearchHistory: (args: any) => React$Node = ({
  onDismiss,
  visible = false,
}) =>
  visible ? (
    <View style={styles.searchHistoryContainer}>
      <UIText>{'Hello there'}</UIText>
    </View>
  ) : null

const styles = StyleSheet.create({
  searchHistoryContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    minWidth: '100%',
    width: DEVICE_WIDTH,
    top: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: colors.lightGray,
  },
})

export default HomeSearchHistory
