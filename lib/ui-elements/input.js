/**
 * @format
 * @flow
 */

import { useState } from 'react'
import type { Node } from 'react'
import { StyleSheet, Text, TextInput } from 'react-native'
import { useTheme } from 'hooks'

const UI_INPUT_HEIGHT = 60
const UI_INPUT_MARGIN = 10

const UIInput: (args: any) => Node = ({
  error = false,
  errorMessage = '',
  onBlur,
  onFocus,
  placeholderTextColor,
  size = 'medium',
  style,
  success = false,
  ...otherProps
}) => {
  const [isActive, setIsActive] = useState(false)

  const {
    createStyles,
    theme: { colors },
    typography,
  } = useTheme()

  const styles = createStyles((theme) => ({
    uiInput: {
      height: UI_INPUT_HEIGHT,
      width: '100%',
      fontSize: typography.fontSize.xxlarge,
      fontWeight: typography.fontWeight.bolder,
      marginTop: UI_INPUT_MARGIN,
      marginBottom: UI_INPUT_MARGIN,
      borderBottomWidth: 2,
      color: theme.colors.text,
    },
    uiInputActive: {
      borderBottomColor: theme.colors.text,
    },
    uiInputInactive: {
      borderBottomColor: theme.colors.neutral,
    },
    uiInputSuccess: {
      borderBottomColor: theme.colors.primary,
    },
    uiInputError: {
      color: theme.colors.danger,
      borderBottomColor: theme.colors.danger,
    },
    uiInputSmall: {
      height: UI_INPUT_HEIGHT * 0.5,
      fontSize: typography.fontSize.base,
      marginTop: UI_INPUT_MARGIN * 0.5,
      marginBottom: UI_INPUT_MARGIN * 0.5,
    },
    errorMessage: {
      width: '100%',
      fontSize: typography.fontSize.small,
      color: theme.colors.danger,
      marginTop: -4,
    },
  }))

  const stylesActive = StyleSheet.compose(styles.uiInput, styles.uiInputActive)

  const stylesInactive = StyleSheet.compose(
    styles.uiInput,
    styles.uiInputInactive,
  )

  const stylesSuccess = StyleSheet.compose(
    styles.uiInput,
    styles.uiInputSuccess,
  )

  const stylesError = StyleSheet.compose(styles.uiInput, styles.uiInputError)

  const onFocusHandler = () => {
    setIsActive(true)

    if (typeof onFocus === 'function') {
      onFocus()
    }
  }

  const onBlurHandler = () => {
    setIsActive(false)

    if (typeof onBlur === 'function') {
      onBlur()
    }
  }

  const getStyle = () => {
    let inputStyle = {}
    if (success) {
      inputStyle = stylesSuccess
    }
    if (error) {
      inputStyle = stylesError
    }
    if (isActive) {
      inputStyle = stylesActive
    } else {
      inputStyle = stylesInactive
    }
    if (size === 'small') {
      inputStyle = StyleSheet.compose(inputStyle, styles.uiInputSmall)
    }
    return inputStyle
  }

  return (
    <>
      <TextInput
        {...otherProps}
        onBlur={onBlurHandler}
        onFocus={onFocusHandler}
        placeholderTextColor={placeholderTextColor ?? colors.neutral}
        style={StyleSheet.compose(getStyle(), style)}
      />
      {error && !!errorMessage && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </>
  )
}

export default UIInput
