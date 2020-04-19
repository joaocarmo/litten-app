/**
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import UIInput from './input'
import { iconEye } from 'images'
import colors from 'styles/colors'

const UIPasswordInput: () => React$Node = ({
  error,
  errorMessage,
  onBlur,
  onFocus,
  secureTextEntry,
  style,
  ...otherProps
}) => {
  const [hidePassword, setHidePassword] = useState(true)
  const [isActive, setIsActive] = useState(false)

  const getStyle = () => {
    if (error) {
      return stylesError
    }
    if (isActive) {
      return stylesActive
    }
    return stylesInactive
  }

  const getEyeStyle = () => {
    if (!hidePassword) {
      return StyleSheet.compose(styles.iconEye, styles.iconEyeActive)
    }
    return styles.iconEye
  }

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

  return (
    <>
      <View style={StyleSheet.compose(getStyle(), style)}>
        <UIInput
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
          secureTextEntry={hidePassword}
          style={styles.uiPasswordInput}
          {...otherProps}
        />
        <TouchableWithoutFeedback
          onPress={() => setHidePassword(!hidePassword)}>
          <Image source={iconEye} style={getEyeStyle()} resizeMode="contain" />
        </TouchableWithoutFeedback>
      </View>
      {error && !!errorMessage && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  uiPasswordInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.gray,
  },
  uiPasswordInput: {
    flex: 1,
    marginTop: 0,
    marginBottom: 0,
    borderBottomWidth: 0,
  },
  uiInputPasswordActive: {
    borderBottomColor: colors.black,
  },
  uiInputPasswordInactive: {
    borderBottomColor: colors.gray,
  },
  uiInputPasswordError: {
    color: colors.errorRed,
    borderBottomColor: colors.errorRed,
  },
  errorMessage: {
    width: '100%',
    fontSize: 12,
    color: colors.errorRed,
    marginTop: -4,
  },
  iconEye: {
    height: 20,
    width: 32,
  },
  iconEyeActive: {
    tintColor: colors.purple,
  },
})

const stylesActive = StyleSheet.compose(
  styles.uiPasswordInputContainer,
  styles.uiInputPasswordActive,
)

const stylesInactive = StyleSheet.compose(
  styles.uiPasswordInputContainer,
  styles.uiInputPasswordInactive,
)

const stylesError = StyleSheet.compose(
  styles.uiPasswordInputContainer,
  styles.uiInputPasswordError,
)

export default UIPasswordInput
