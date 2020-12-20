/**
 * @format
 * @flow
 */

import { StyleSheet, TextInput } from 'react-native'
import {
  UI_ELEMENT_BORDER_MARGIN,
  UI_ELEMENT_BORDER_RADIUS,
} from 'utils/constants'
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
    borderRadius: UI_ELEMENT_BORDER_RADIUS,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: UI_ELEMENT_BORDER_MARGIN,
    marginBottom: UI_ELEMENT_BORDER_MARGIN,
    textAlignVertical: 'top',
    backgroundColor: colors.white,
  },
})

export default UITextArea
