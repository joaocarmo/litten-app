/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import { vh } from 'react-native-expo-viewport-units'
import { STRUCTURE_TAB_NAV_HEIGHT } from 'utils/constants'
import colors from 'styles/colors'

const ScreenTemplate: () => React$Node = ({ children, header }) => (
  <SafeAreaView style={styles.safeAreaView}>
    <StatusBar barStyle="light-content" />
    <ScrollView
      bounces={false}
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainerStyle}>
      <View style={styles.header}>{header}</View>
      <View style={styles.contentOut}>
        <View style={styles.contentIn}>{children}</View>
      </View>
    </ScrollView>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  scrollView: {},
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    height: vh((1 / 10) * 100),
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: colors.blue,
  },
  contentOut: {
    flexGrow: 1,
    backgroundColor: colors.blue,
  },
  contentIn: {
    flexGrow: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: colors.lightGray,
    paddingTop: STRUCTURE_TAB_NAV_HEIGHT * 0.4,
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT * 1.25,
    paddingLeft: 20,
    paddingRight: 20,
  },
})

export default ScreenTemplate
