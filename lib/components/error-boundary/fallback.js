/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { SafeAreaView, StatusBar, View } from 'react-native'
import { useTheme } from 'hooks'
import { UIHeader, UIText } from 'ui-elements'
import { STRUCTURE_TEMPLATE_SCREEN_PADDING } from 'utils/constants'
import { translate } from 'utils/i18n'

const Fallback: (args: any) => Node = () => {
  const {
    createStyles,
    theme: { colors },
  } = useTheme()

  const styles = createStyles((theme) => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.neutralLight,
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 2 * STRUCTURE_TEMPLATE_SCREEN_PADDING,
      paddingRight: 2 * STRUCTURE_TEMPLATE_SCREEN_PADDING,
    },
    centeredText: {
      textAlign: 'center',
    },
  }))

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.neutralLight}
        />
        <UIHeader>{translate('screens.maintenance.crashTitle')}</UIHeader>
        <UIText style={styles.centeredText}>
          {translate('screens.maintenance.crashDescription')}
        </UIText>
      </View>
    </SafeAreaView>
  )
}

export default Fallback
