/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet } from 'react-native'
import { Picker } from '@react-native-community/picker'
// import colors from 'styles/colors'

const UISelect: () => React$Node = ({
  items,
  itemStyle,
  style,
  ...otherProps
}) => (
  <Picker
    {...otherProps}
    enabled={false}
    style={StyleSheet.compose(styles.uiSelect, style)}
    itemStyle={StyleSheet.compose(styles.itemStyle, itemStyle)}>
    {items.map(({ key, label, value }) => (
      <Picker.Item key={key} label={label} value={value} />
    ))}
  </Picker>
)

const styles = StyleSheet.create({
  uiSelect: {
    height: 60,
    width: '100%',
  },
  itemStyle: {},
})

export default UISelect
