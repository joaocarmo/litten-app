import { useMemo } from 'react'
import { TextInput } from 'react-native'
import type { TextInputProps } from 'react-native'
import { useTheme } from '@hooks'
import {
  UI_ELEMENT_BORDER_MARGIN,
  UI_ELEMENT_BORDER_RADIUS,
} from '@utils/constants'

const rowHeight = 64

export type UITextAreaProps = {
  children?: string
  multiline?: TextInputProps['multiline']
  rows?: number
} & TextInputProps

const UITextArea = ({
  children,
  multiline,
  placeholderTextColor,
  rows,
  style,
  ...otherProps
}: UITextAreaProps) => {
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

UITextArea.defaultProps = {
  children: null,
  multiline: true,
  rows: 3,
}

export default UITextArea
