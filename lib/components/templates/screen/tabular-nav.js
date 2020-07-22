/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import colors from 'styles/colors'

const ScreenTabularNav: () => React$Node = ({ tabs, style }) => {
  const navigation = useNavigation()

  const navIdx = useNavigationState((state) => state?.index)

  return (
    <View style={StyleSheet.compose(styles.container, style)}>
      {tabs.map(({ key, name, title }, idx) => (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate(name)}
          key={key}>
          <View
            style={
              navIdx === idx
                ? StyleSheet.compose(styles.tab, styles.activeTab)
                : styles.tab
            }>
            <Text style={styles.text}>{title}</Text>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  tab: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.black,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
})

export default ScreenTabularNav
