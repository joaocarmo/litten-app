/**
 * @format
 * @flow
 */

import { StyleSheet, TextInput } from 'react-native'
import colors from 'styles/colors'

const rowHeight = 64

const UITextArea: (args: any) => React$Node = ({
  children,
  multiline = true,
  rows = 3,
  style,
  ...otherProps
}) => {
  const minHeightStyle = {
    minHeight: rows * rowHeight,
  }

  return (
    <TextInput
      multiline={multiline}
      value={children}
      {...otherProps}
      style={[styles.uiTextArea, minHeightStyle, style]}
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
    textAlignVertical: 'top',
    backgroundColor: colors.white,
  },
})

export default UITextArea
