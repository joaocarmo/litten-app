import { Text, View } from 'react-native'
import { useTheme } from '@hooks'
import uiBadgeStyles from '@ui-elements/badge/index.styles'

const UIBadge = ({ children, number, showNonPositive = false }) => {
  const { createStyles } = useTheme()

  const styles = createStyles(uiBadgeStyles)

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
