import { useCallback } from 'react'
import type { ReactNode } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import type { PressableProps, TextProps } from 'react-native'
import { useTheme } from '@hooks'
import UILoader from '@ui-elements/loader'
import uiButtonStyles from '@ui-elements/button/index.styles'

export type UIButtonProps = {
  compact?: boolean
  danger?: boolean
  disabled?: boolean
  fluid?: boolean
  loading?: boolean
  primary?: boolean
  secondary?: boolean
  textStyle?: TextProps['style']
} & PressableProps

const UIButton = ({
  children,
  compact,
  danger,
  disabled,
  fluid,
  loading,
  onPress,
  secondary,
  style,
  textStyle,
  ...otherProps
}: UIButtonProps) => {
  const { createStyles } = useTheme()

  const styles = createStyles(uiButtonStyles)

  const primaryStyle = styles.uiButton
  const primaryDisabledStyle = StyleSheet.compose(primaryStyle, styles.disabled)
  const secondaryStyle = StyleSheet.compose(primaryStyle, styles.secondary)
  const secondaryDisabledStyle = StyleSheet.compose(
    secondaryStyle,
    styles.disabled,
  )
  const dangerStyle = StyleSheet.compose(primaryStyle, styles.danger)
  const dangerDisabledStyle = StyleSheet.compose(dangerStyle, styles.disabled)
  const fluidity = fluid ? styles.fluid : styles.notFluid

  const getStyle = useCallback(() => {
    if (danger) {
      if (disabled) {
        return dangerDisabledStyle
      }

      return dangerStyle
    }

    if (secondary) {
      if (disabled) {
        return secondaryDisabledStyle
      }

      return secondaryStyle
    }

    if (disabled) {
      return primaryDisabledStyle
    }

    return primaryStyle
  }, [
    danger,
    dangerDisabledStyle,
    dangerStyle,
    disabled,
    primaryDisabledStyle,
    primaryStyle,
    secondary,
    secondaryDisabledStyle,
    secondaryStyle,
  ])

  return (
    <Pressable
      {...otherProps}
      onPress={disabled ? null : onPress}
      style={({ pressed }) =>
        [
          getStyle(),
          compact ? styles.compact : fluidity,
          style,
          pressed && !disabled && !loading ? styles.pressedStyle : undefined,
        ] as any
      }
    >
      <UILoader active={loading} transparent={100} />
      {!loading && (
        <Text style={StyleSheet.compose(styles.uiButtonText, textStyle)}>
          {children as ReactNode}
        </Text>
      )}
    </Pressable>
  )
}

UIButton.defaultProps = {
  compact: false,
  danger: false,
  disabled: false,
  fluid: false,
  loading: false,
  primary: true,
  secondary: false,
  textStyle: undefined,
}

export default UIButton
