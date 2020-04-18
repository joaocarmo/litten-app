/**
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react'
import { StyleSheet, Text, TextInput } from 'react-native'
import colors from 'styles/colors'

const UIInput: () => React$Node = ({
  error = false,
  errorMessage = '',
  onBlur,
  onFocus,
  placeholderTextColor = colors.gray,
  style,
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
      onFocus()
    }
  }

  const getStyle = () => {
    if (error) {
      return stylesError
    }
    if (isActive) {
      return stylesActive
    }
    return stylesInactive
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
    height: 60,
    width: '100%',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    color: colors.black,
  },
  uiInputActive: {
    borderBottomColor: colors.black,
  },
  uiInputInactive: {
    borderBottomColor: colors.gray,
  },
  uiInputError: {
    color: colors.errorRed,
    borderBottomColor: colors.errorRed,
  },
  errorMessage: {
    width: '100%',
    fontSize: 12,
    color: colors.errorRed,
    marginTop: -4,
  },
})

const stylesActive = StyleSheet.compose(styles.uiInput, styles.uiInputActive)

const stylesInactive = StyleSheet.compose(
  styles.uiInput,
  styles.uiInputInactive,
)

const stylesError = StyleSheet.compose(styles.uiInput, styles.uiInputError)

export default UIInput
