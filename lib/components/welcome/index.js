/**
 * @format
 * @flow
 */

import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import Header from 'components/welcome/header'
import Intro from 'components/welcome/intro'
import Actions from 'components/welcome/actions'
import { STRUCTURE_TAB_NAV_HEIGHT } from 'utils/constants'
import colors from 'styles/colors'

const Welcome: (args: any) => React$Node = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor={colors.lightGray} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
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
})

export default Welcome
