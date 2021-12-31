import { useMemo } from 'react'

import { TextInput } from 'react-native'
import { useTheme } from 'hooks'
import {
  UI_ELEMENT_BORDER_MARGIN,
  UI_ELEMENT_BORDER_RADIUS,
} from 'utils/constants'
const rowHeight = 64

const UITextArea = ({
  children,
  multiline = true,
  placeholderTextColor,
  rows = 3,
  style,
  ...otherProps
}) => {
  const {
    createStyles,
    theme: { colors },
  } = useTheme()
  const styles = createStyles((theme) => ({
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
      color: theme.colors.text,
      backgroundColor: theme.colors.background,
    },
  }))
  const minHeightStyle = useMemo(
    () => ({
      minHeight: rows * rowHeight,
    }),
    [rows],
  )
  return (
    <TextInput
      multiline={multiline}
      value={children}
      placeholderTextColor={placeholderTextColor ?? colors.neutral}
      {...otherProps}
      style={[styles.uiTextArea, minHeightStyle, style]}
    />
  )
}

export default UITextArea
