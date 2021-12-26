/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { Text, View } from 'react-native'
import { useTheme } from 'hooks'
import {
  UI_BADGE_ELEMENT_OFFSET,
  UI_BADGE_PADDING,
  UI_BADGE_SIZE,
} from 'utils/constants'

const UIBadge: (args: any) => Node = ({
  children,
  number,
  showNonPositive = false,
}) => {
  const { createStyles, typography } = useTheme()

  const styles = createStyles((theme) => ({
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
      borderRadius: UI_BADGE_SIZE,
      backgroundColor: theme.colors.danger,
      zIndex: 1,
    },
    uiBadgeNumberText: {
      color: theme.colors.textAlt,
      fontSize: typography.fontSize.xxsmall,
      fontWeight: typography.fontWeight.bolder,
      textAlign: 'center',
    },
  }))

  return (
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
}

export default UIBadge
