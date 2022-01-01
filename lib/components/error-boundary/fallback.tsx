import { SafeAreaView, StatusBar, View } from 'react-native'
import { useTheme } from '@hooks'
import { UIHeader, UIText } from '@ui-elements'
import { translate } from '@utils/i18n'
import fallbackStyles from '@components/error-boundary/fallback.styles'

const Fallback = () => {
  const {
    isDark,
    createStyles,
    theme: { colors },
  } = useTheme()
  const styles = createStyles(fallbackStyles)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
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
