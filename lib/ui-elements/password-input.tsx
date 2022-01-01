import { useState } from 'react'
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@hooks'
import UIInput from '@ui-elements/input'
import { Eye as EyeIcon } from '@images/components/icons'

const UIPasswordInput = ({
  error,
  errorMessage,
  onBlur,
  onFocus,
  // secureTextEntry,
  style,
  success = false,
  ...otherProps
}) => {
  const [hidePassword, setHidePassword] = useState(true)
  const [isActive, setIsActive] = useState(false)
  const {
    createStyles,
    theme: { colors },
    typography,
  } = useTheme()

  const styles = createStyles((theme) => ({
    uiPasswordInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginTop: 10,
      marginBottom: 10,
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.neutral,
    },
    uiPasswordInput: {
      flex: 1,
      marginTop: 0,
      marginBottom: 0,
      borderBottomWidth: 0,
    },
    uiInputPasswordActive: {
      borderBottomColor: theme.colors.text,
    },
    uiInputPasswordInactive: {
      borderBottomColor: theme.colors.neutral,
    },
    uiInputPasswordSuccess: {
      borderBottomColor: theme.colors.primary,
    },
    uiInputPasswordError: {
      borderBottomColor: theme.colors.danger,
    },
    errorMessage: {
      width: '100%',
      fontSize: typography.fontSize.small,
      color: theme.colors.danger,
      marginTop: -4,
    },
  }))

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
        <Pressable onPress={() => setHidePassword(!hidePassword)}>
          <EyeIcon
            height={15}
            width={24}
            fill={hidePassword ? colors.neutralDark : colors.primary}
          />
        </Pressable>
      </View>
      {error && !!errorMessage && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </>
  )
}

export default UIPasswordInput
