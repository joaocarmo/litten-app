import { SafeAreaView, StatusBar, View } from 'react-native'
import { useTheme } from '@hooks'
import Header from '@components/welcome/header'
import Intro from '@components/welcome/intro'
import Actions from '@components/welcome/actions'
import welcomeComponentStyle from './index.styles'

const Welcome = () => {
  const {
    isDark,
    createStyles,
    theme: { colors },
  } = useTheme()

  const styles = createStyles(welcomeComponentStyle)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.neutralLight}
      />
      <View style={styles.header}>
        <Header />
      </View>
      <View style={styles.intro}>
        <Intro />
      </View>
      <View style={styles.actions}>
        <Actions />
      </View>
    </SafeAreaView>
  )
}

export default Welcome
