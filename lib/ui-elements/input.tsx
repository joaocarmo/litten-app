import { useCallback, useState } from 'react'
import { StyleSheet, Text, TextInput } from 'react-native'
import type { TextInputProps } from 'react-native'
import { useTheme } from '@hooks'
import inputStyles from '@ui-elements/input.styles'

type UISelectProps = {
  active?: boolean
  error?: boolean
  errorMessage?: string
  size?: 'small' | 'medium' | 'large'
  success?: boolean
} & TextInputProps

const UIInput = ({
  error,
  errorMessage,
  onBlur,
  onFocus,
  placeholderTextColor,
  size,
  style,
  success,
  ...otherProps
}: UISelectProps) => {
  const [isActive, setIsActive] = useState(false)
  const {
    createStyles,
    theme: { colors },
  } = useTheme()

  const styles = createStyles(inputStyles)

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

  const onFocusHandler = useCallback(
    (e) => {
      setIsActive(true)

      if (typeof onFocus === 'function') {
        onFocus(e)
      }
    },
    [onFocus],
  )

  const onBlurHandler = useCallback(
    (e) => {
      setIsActive(false)

      if (typeof onBlur === 'function') {
        onBlur(e)
      }
    },
    [onBlur],
  )

  const getStyle = useCallback(() => {
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
  }, [
    error,
    isActive,
    size,
    styles.uiInputSmall,
    stylesActive,
    stylesError,
    stylesInactive,
    stylesSuccess,
    success,
  ])

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

UIInput.defaultProps = {
  active: true,
  error: false,
  errorMessage: '',
  size: 'medium',
  success: false,
}

export default UIInput
