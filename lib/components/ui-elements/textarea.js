/**
 * @format
 * @flow
 */

import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import colors from 'styles/colors'

const rowHeight = 64

const UITextArea: () => React$Node = ({
  children,
  multiline = true,
  rows = 3,
  style,
  ...otherProps
}) => {
  const getStyle = () => {
    return StyleSheet.compose(styles.uiTextArea, {
      minHeight: rows * rowHeight,
    })
  }

  return (
    <TextInput
      multiline={multiline}
      value={children}
      {...otherProps}
      style={StyleSheet.compose(getStyle(), style)}
    />
  )
}

const styles = StyleSheet.create({
  uiTextArea: {
    flex: 1,
    minHeight: rowHeight,
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: colors.white,
  },
})

export default UITextArea
