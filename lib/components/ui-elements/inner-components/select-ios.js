/**
 * @format
 * @flow
 */

import React, { useState } from 'react'
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import UIInput from '../input'
import UISelectPicker from './select-picker'
import colors from 'styles/colors'

const IOSSelect: (args: any) => React$Node = ({
  error,
  errorMessage,
  items,
  placeholder,
  selectedValue,
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
        error={error}
        errorMessage={errorMessage}
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
          <UISelectPicker
            selectedValue={selectedValue}
            items={items}
            {...otherProps}
          />
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
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
})

export default IOSSelect
