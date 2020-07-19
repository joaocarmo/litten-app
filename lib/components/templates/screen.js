/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import { vh } from 'react-native-expo-viewport-units'
import { STRUCTURE_TAB_NAV_HEIGHT } from 'utils/constants'
import colors from 'styles/colors'

const headerHeight = vh((1 / 10) * 100)

const StaticScreenTemplate: () => React$Node = ({ children, header }) => (
  <SafeAreaView style={styles.safeAreaView}>
    <StatusBar barStyle="light-content" />
    <KeyboardAvoidingView behavior="padding" style={styles.contentView}>
      <View style={styles.header}>{header}</View>
      <View style={styles.contentStatic}>{children}</View>
    </KeyboardAvoidingView>
  </SafeAreaView>
)

const ScrollableScreenTemplate: () => React$Node = ({ children, header }) => (
  <SafeAreaView style={styles.safeAreaView}>
    <StatusBar barStyle="light-content" />
    <KeyboardAvoidingView behavior="position" style={styles.kbContainer}>
      <View style={styles.offColor} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.contentView}>
          <View style={styles.header}>{header}</View>
          <View style={styles.contentOut}>
            <View style={styles.contentIn}>{children}</View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
)

const ScreenTemplate: () => React$Node = ({
  children,
  header,
  scrollable = true,
}) =>
  scrollable && children ? (
    <ScrollableScreenTemplate header={header}>
      {children}
    </ScrollableScreenTemplate>
  ) : (
    <StaticScreenTemplate header={header}>{children}</StaticScreenTemplate>
  )

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  kbContainer: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  contentView: {
    flex: 1,
  },
  header: {
    height: headerHeight,
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
    height: vh(50),
    width: '100%',
    top: 0,
    backgroundColor: colors.blue,
  },
  contentStatic: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: colors.lightGray,
    paddingTop: STRUCTURE_TAB_NAV_HEIGHT * 0.2,
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT * 0.7,
  },
})

export default ScreenTemplate
