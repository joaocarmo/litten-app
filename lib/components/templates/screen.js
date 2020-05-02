/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import { vh } from 'react-native-expo-viewport-units'
import { STRUCTURE_TAB_NAV_HEIGHT } from 'utils/constants'
import colors from 'styles/colors'

const ScreenTemplate: () => React$Node = ({ children, header }) => (
  <>
    <StatusBar barStyle="light-content" />
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainerStyle}>
      <View style={styles.header}>{header}</View>
      <View style={styles.contentOut}>
        <View style={styles.contentIn}>{children}</View>
      </View>
    </ScrollView>
  </>
)

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.blue,
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    height: vh((1 / 7) * 100),
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: STRUCTURE_TAB_NAV_HEIGHT * 0.4,
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT * 1.25,
  },
})

export default ScreenTemplate
