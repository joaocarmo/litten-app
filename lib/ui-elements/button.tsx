import { useCallback } from 'react'
import type { ReactNode } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import type { PressableProps, TextProps } from 'react-native'
import { useTheme } from '@hooks'
import UILoader from '@ui-elements/loader'
import {
  RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
  UI_BUTTON_BORDER_RADIUS,
  UI_BUTTON_FIXED_WIDTH,
  UI_PRESSED_OPACITY,
} from '@utils/constants'

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

  const styles = createStyles((theme, typography) => ({
    uiButton: {
      minHeight: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
      borderRadius: UI_BUTTON_BORDER_RADIUS,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary,
    },
    fluid: {
      flex: 1,
      width: '100%',
    },
    notFluid: {
      width: UI_BUTTON_FIXED_WIDTH,
    },
    compact: {
      paddingLeft: 32,
      paddingRight: 32,
    },
    uiButtonText: {
      color: theme.colors.textAlt,
      fontSize: typography.fontSize.large,
      fontWeight: typography.fontWeight.bolder,
    },
    secondary: {
      backgroundColor: theme.colors.secondary,
    },
    danger: {
      backgroundColor: theme.colors.danger,
    },
    pressedStyle: {
      opacity: UI_PRESSED_OPACITY,
    },
    disabled: {
      opacity: 0.3,
    },
  }))

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
      style={({ pressed }) => [
        getStyle(),
        compact ? styles.compact : fluidity,
        style,
        pressed && !disabled && !loading ? styles.pressedStyle : undefined,
      ]}
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
