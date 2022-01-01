import { SafeAreaView, StatusBar, View } from 'react-native'
import { useTheme } from '@hooks'
import { UIHeader, UIText } from '@ui-elements'
import Header from '@components/welcome/header'
import { STRUCTURE_TEMPLATE_SCREEN_PADDING } from '@utils/constants'
import { translate } from '@utils/i18n'

const MaintenanceScreen = ({ isAppBlocked }) => {
  const {
    isDark,
    createStyles,
    theme: { colors },
  } = useTheme()

  const styles = createStyles((theme) => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.neutralLight,
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
  }))

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.neutralLight}
      />
      <View style={styles.header}>
        <Header />
      </View>
      <View style={styles.content}>
        <UIHeader>
          {translate(`screens.maintenance.${isAppBlocked}.title`)}
        </UIHeader>
        <UIText style={styles.centeredText}>
          {translate(`screens.maintenance.${isAppBlocked}.description`)}
        </UIText>
      </View>
      <View style={styles.bottom} />
    </SafeAreaView>
  )
}

export default MaintenanceScreen
