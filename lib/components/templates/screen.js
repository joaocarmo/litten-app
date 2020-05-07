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
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainerStyle}>
      <View style={styles.contentView}>
        <View style={styles.header}>{header}</View>
        <View style={styles.contentOut}>
          <View style={styles.contentIn}>{children}</View>
        </View>
      </View>
      <View style={styles.offColor} />
    </ScrollView>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  contentView: {
    flex: 1,
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
  scrollView: {},
  contentContainerStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentIn: {
    flexGrow: 1,
    justifyContent: 'space-between',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: colors.lightGray,
    paddingTop: STRUCTURE_TAB_NAV_HEIGHT * 0.2,
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT * 1.5,
  },
  offColor: {
    position: 'absolute',
    height: vh(100),
    width: '100%',
    bottom: -vh(100),
    backgroundColor: colors.lightGray,
  },
})

export default ScreenTemplate
