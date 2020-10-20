/**
 * @format
 * @flow
 */

import { useState } from 'react'
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import UIInput from './input'
import UIImage from './image'
import { iconEye } from 'images'
import colors from 'styles/colors'

const UIPasswordInput: (args: any) => React$Node = ({
  error,
  errorMessage,
  onBlur,
  onFocus,
  secureTextEntry,
  style,
  success = false,
  ...otherProps
}) => {
  const [hidePassword, setHidePassword] = useState(true)
  const [isActive, setIsActive] = useState(false)

  const getStyle = (): ViewStyleProp => {
    if (success) {
      return stylesSuccess
    }
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
          <UIImage source={iconEye} style={getEyeStyle()} />
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
  uiInputPasswordSuccess: {
    borderBottomColor: colors.purple,
  },
  uiInputPasswordError: {
    borderBottomColor: colors.red,
  },
  errorMessage: {
    width: '100%',
    fontSize: 12,
    color: colors.red,
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

const stylesSuccess = StyleSheet.compose(
  styles.uiPasswordInputContainer,
  styles.uiInputPasswordSuccess,
)

const stylesError = StyleSheet.compose(
  styles.uiPasswordInputContainer,
  styles.uiInputPasswordError,
)

export default UIPasswordInput
