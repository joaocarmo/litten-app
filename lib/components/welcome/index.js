/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { SafeAreaView, StatusBar, View } from 'react-native'
import { useTheme } from 'hooks'
import Header from 'components/welcome/header'
import Intro from 'components/welcome/intro'
import Actions from 'components/welcome/actions'
import { STRUCTURE_TAB_NAV_HEIGHT } from 'utils/constants'

const Welcome: (args: any) => Node = () => {
  const {
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
    intro: {
      flex: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    actions: {
      alignItems: 'center',
      marginBottom: STRUCTURE_TAB_NAV_HEIGHT / 2,
    },
  }))

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
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
