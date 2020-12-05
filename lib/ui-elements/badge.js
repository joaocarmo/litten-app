/**
 * @format
 * @flow
 */

import { StyleSheet, Text, View } from 'react-native'
import {
  UI_BADGE_ELEMENT_OFFSET,
  UI_BADGE_PADDING,
  UI_BADGE_SIZE,
} from 'utils/constants'
import colors from 'styles/colors'

const UIBadge: (args: any) => React$Node = ({
  children,
  number,
  showNonPositive = false,
}) => (
  <View style={styles.uiBadgeContainer}>
    {Number.isInteger(number) &&
      (showNonPositive || (!showNonPositive && number > 0)) && (
        <View style={styles.uiBadgeNumber}>
          <Text style={styles.uiBadgeNumberText}>{number}</Text>
        </View>
      )}
    {children}
  </View>
)

const styles = StyleSheet.create({
  uiBadgeContainer: {
    position: 'relative',
  },
  uiBadgeNumber: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: UI_BADGE_SIZE,
    minWidth: UI_BADGE_SIZE,
    top: -UI_BADGE_ELEMENT_OFFSET / 2,
    right: -UI_BADGE_ELEMENT_OFFSET,
    padding: UI_BADGE_PADDING,
    borderRadius: UI_BADGE_SIZE / 2,
    backgroundColor: colors.red,
    zIndex: 1,
  },
  uiBadgeNumberText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
})

export default UIBadge
