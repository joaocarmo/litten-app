/**
 * @format
 * @flow
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
import ScreenTabular from 'templates/screen/tabular'
import ScreenTabularNav from 'templates/screen/tabular-nav'
import { STRUCTURE_TAB_NAV_HEIGHT } from 'utils/constants'
import colors from 'styles/colors'

const headerHeight = vh((1 / 10) * 100)
const borderRadius = 26

const StaticScreenTemplate: () => React$Node = ({ children, header, tabs }) => (
  <KeyboardAvoidingView behavior="padding" style={styles.contentView}>
    <View style={styles.header}>{header}</View>
    <View style={styles.topBar} />
    {tabs && <ScreenTabularNav tabs={tabs} style={styles.tabBar} />}
    <View
      style={StyleSheet.compose(styles.contentCommon, styles.contentStatic)}>
      {children}
    </View>
  </KeyboardAvoidingView>
)

const ScrollableScreenTemplate: () => React$Node = ({
  children,
  header,
  tabs,
}) => (
  <KeyboardAvoidingView behavior="position" style={styles.kbContainer}>
    <View style={styles.offColor} />
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainerStyle}>
      <View style={styles.contentView}>
        <View style={styles.header}>{header}</View>
        <View style={styles.contentOut}>
          <View style={styles.topBar} />
          {tabs && <ScreenTabularNav tabs={tabs} style={styles.tabBar} />}
          <View
            style={StyleSheet.compose(styles.contentCommon, styles.contentIn)}>
            {children}
          </View>
        </View>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
)

const ScreenTemplate: () => React$Node = ({
  children,
  header,
  scrollable = true,
  tabs = null,
}) => {
  const ScreenComponent =
    scrollable && children ? ScrollableScreenTemplate : StaticScreenTemplate
  let screenContent = (
    <ScreenComponent header={header}>{children}</ScreenComponent>
  )

  if (Array.isArray(tabs) && tabs.length) {
    tabs.forEach((tab, idx, arr) => {
      const { component: InnerComponent, scrollable: scrollableTab } = tab

      let TabScreenComponent =
        scrollableTab && InnerComponent
          ? ScrollableScreenTemplate
          : StaticScreenTemplate

      const CompoundComponent: () => React$Node = () => (
        <TabScreenComponent header={header} tabs={tabs}>
          <InnerComponent />
        </TabScreenComponent>
      )

      arr[idx].compoundComponent = CompoundComponent
    })

    screenContent = <ScreenTabular tabs={tabs} />
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle="light-content" />
      {screenContent}
    </SafeAreaView>
  )
}

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
    backgroundColor: colors.blue,
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
  topBar: {
    height: STRUCTURE_TAB_NAV_HEIGHT * 0.35,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    backgroundColor: colors.lightGray,
  },
  tabBar: {
    height: STRUCTURE_TAB_NAV_HEIGHT * 0.3,
    backgroundColor: colors.lightGray,
  },
  contentCommon: {
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: colors.lightGray,
  },
  contentIn: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT * 1.5,
  },
  contentStatic: {
    flex: 1,
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT * 0.7,
  },
  offColor: {
    position: 'absolute',
    height: vh(50),
    width: '100%',
    top: 0,
    backgroundColor: colors.blue,
  },
})

export default ScreenTemplate
