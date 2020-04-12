/**
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react'
import {
  Platform,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Picker } from '@react-native-community/picker'
import UIInput from './input'
import colors from 'styles/colors'

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

const IOSSelect: () => React$Node = ({
  placeholder,
  selectedValue,
  items,
  ...otherProps
}) => {
  const [selectorOpen, setSelectorOpen] = useState(false)

  const toggleModal = () => setSelectorOpen(!selectorOpen)

  const translateSelectedValue = () =>
    items.find(({ value }) => value === selectedValue)?.label

  return (
    <>
      <UIInput
        placeholder={placeholder}
        editable={false}
        onTouchStart={toggleModal}
        style={StyleSheet.compose(
          styles.iosUISelect,
          selectorOpen ? { borderBottomColor: colors.black } : {},
        )}
        value={translateSelectedValue()}
        active={selectorOpen}
      />
      <Modal
        visible={selectorOpen}
        transparent
        animationType="slide"
        supportedOrientations={['portrait']}>
        <TouchableOpacity
          onPress={toggleModal}
          style={styles.iosModalTopContent}
        />
        <View style={styles.iosBottomContent}>
          <Select selectedValue={selectedValue} items={items} {...otherProps} />
        </View>
      </Modal>
    </>
  )
}

const UISelect: () => React$Node = (props) =>
  Platform.OS === 'ios' ? <IOSSelect {...props} /> : <Select {...props} />

const styles = StyleSheet.create({
  iosElementContainer: {
    alignSelf: 'stretch',
  },
  iosModalTopContent: {
    flex: 1,
  },
  iosBottomContent: {
    height: 215,
    justifyContent: 'center',
    backgroundColor: colors.iosGray,
  },
  iosUISelect: {
    height: 60,
    width: '100%',
  },
  uiSelect: {},
  itemStyle: {},
})

export default UISelect
