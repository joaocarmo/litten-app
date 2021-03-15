/**
 * @format
 * @flow
 */

import { useState } from 'react'
import type { Node } from 'react'
import { StyleSheet, Text, TextInput } from 'react-native'
import colors from 'styles/colors'
import { fontSize, fontWeight } from 'styles/typography'

const UI_INPUT_HEIGHT = 60
const UI_INPUT_MARGIN = 10

const UIInput: (args: any) => Node = ({
  error = false,
  errorMessage = '',
  onBlur,
  onFocus,
  placeholderTextColor = colors.gray,
  size = 'medium',
  style,
  success = false,
  ...otherProps
}) => {
  const [isActive, setIsActive] = useState(false)

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
        placeholderTextColor={placeholderTextColor}
        style={StyleSheet.compose(getStyle(), style)}
      />
      {error && !!errorMessage && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  uiInput: {
    height: UI_INPUT_HEIGHT,
    width: '100%',
    fontSize: fontSize.xxlarge,
    fontWeight: fontWeight.bolder,
    marginTop: UI_INPUT_MARGIN,
    marginBottom: UI_INPUT_MARGIN,
    borderBottomWidth: 2,
    color: colors.black,
  },
  uiInputActive: {
    borderBottomColor: colors.black,
  },
  uiInputInactive: {
    borderBottomColor: colors.gray,
  },
  uiInputSuccess: {
    borderBottomColor: colors.purple,
  },
  uiInputError: {
    color: colors.red,
    borderBottomColor: colors.red,
  },
  uiInputSmall: {
    height: UI_INPUT_HEIGHT * 0.5,
    fontSize: fontSize.base,
    marginTop: UI_INPUT_MARGIN * 0.5,
    marginBottom: UI_INPUT_MARGIN * 0.5,
  },
  errorMessage: {
    width: '100%',
    fontSize: fontSize.small,
    color: colors.red,
    marginTop: -4,
  },
})

const stylesActive = StyleSheet.compose(styles.uiInput, styles.uiInputActive)

const stylesInactive = StyleSheet.compose(
  styles.uiInput,
  styles.uiInputInactive,
)

const stylesSuccess = StyleSheet.compose(styles.uiInput, styles.uiInputSuccess)

const stylesError = StyleSheet.compose(styles.uiInput, styles.uiInputError)

export default UIInput
