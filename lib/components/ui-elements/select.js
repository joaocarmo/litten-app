/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { Picker } from '@react-native-community/picker'
// import colors from 'styles/colors'

const Select: () => React$Node = ({
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

const IOSSelect: () => React$Node = (props) => <Select {...props} />

const UISelect: () => React$Node = (props) =>
  Platform.OS === 'ios' ? <IOSSelect {...props} /> : <Select {...props} />

const styles = StyleSheet.create({
  uiSelect: {
    height: 60,
    width: '100%',
  },
  itemStyle: {},
})

export default UISelect
