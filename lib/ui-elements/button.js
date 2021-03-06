/**
 * @format
 * @flow
 */

import { Pressable, StyleSheet, Text } from 'react-native'
import UILoader from 'ui-elements/loader'
import {
  RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
  UI_BUTTON_BORDER_RADIUS,
  UI_BUTTON_FIXED_WIDTH,
  UI_PRESSED_OPACITY,
} from 'utils/constants'
import colors from 'styles/colors'
import { fontSize, fontWeight } from 'styles/typography'

const UIButton: (args: any) => React$Node = ({
  children,
  compact = false,
  danger = false,
  disabled = false,
  fluid = false,
  loading = false,
  onPress,
  secondary = false,
  style,
  textStyle,
  ...otherProps
}) => {
  const fluidity = fluid ? styles.fluid : styles.notFluid

  const getStyle = () => {
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
  }

  return (
    <Pressable
      {...otherProps}
      onPress={disabled ? null : onPress}
      style={({ pressed }) => [
        getStyle(),
        compact ? styles.compact : fluidity,
        style,
        pressed && !disabled && !loading ? styles.pressedStyle : undefined,
      ]}>
      <UILoader active={loading} transparent={100} />
      {!loading && (
        <Text style={StyleSheet.compose(styles.uiButtonText, textStyle)}>
          {children}
        </Text>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  uiButton: {
    minHeight: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
    borderRadius: UI_BUTTON_BORDER_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.purple,
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
    color: colors.white,
    fontSize: fontSize.large,
    fontWeight: fontWeight.bolder,
  },
  secondary: {
    backgroundColor: colors.blue,
  },
  danger: {
    backgroundColor: colors.red,
  },
  pressedStyle: {
    opacity: UI_PRESSED_OPACITY,
  },
  disabled: {
    opacity: 0.3,
  },
})

const primaryStyle = styles.uiButton
const primaryDisabledStyle = StyleSheet.compose(primaryStyle, styles.disabled)
const secondaryStyle = StyleSheet.compose(primaryStyle, styles.secondary)
const secondaryDisabledStyle = StyleSheet.compose(
  secondaryStyle,
  styles.disabled,
)
const dangerStyle = StyleSheet.compose(primaryStyle, styles.danger)
const dangerDisabledStyle = StyleSheet.compose(dangerStyle, styles.disabled)

export default UIButton
