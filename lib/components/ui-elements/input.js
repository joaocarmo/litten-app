/**
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import colors from 'styles/colors'

const UIInput: () => React$Node = ({
  placeholderTextColor = colors.gray,
  onBlur,
  onFocus,
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

  return (
    <TextInput
      {...otherProps}
      onBlur={onBlurHandler}
      onFocus={onFocusHandler}
      placeholderTextColor={placeholderTextColor}
      style={StyleSheet.compose(
        isActive ? stylesActive : stylesInactive,
        style,
      )}
    />
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
  },
  uiInputActive: {
    borderBottomColor: colors.black,
  },
  uiInputInactive: {
    borderBottomColor: colors.gray,
  },
})

const stylesActive = StyleSheet.compose(styles.uiInput, styles.uiInputActive)

const stylesInactive = StyleSheet.compose(
  styles.uiInput,
  styles.uiInputInactive,
)

export default UIInput
