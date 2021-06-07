/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { UI_HIDDEN_OPTION_WIDTH, UI_PRESSED_OPACITY } from 'utils/constants'
import colors from 'styles/colors'
import { fontSize, fontWeight } from 'styles/typography'

const UIMessageHiddenItem: (args: any) => Node = ({
  children,
  style,
  ...otherProps
}) => (
  <Pressable
    style={({ pressed }) => [
      styles.uiMessageHiddenItem,
      style,
      pressed ? styles.uiMessageHiddenItemPressed : undefined,
    ]}
    {...otherProps}>
    {typeof children === 'string' ? (
      <Text style={styles.uiMessageHiddenItemText}>{children}</Text>
    ) : (
      children
    )}
  </Pressable>
)

const styles = StyleSheet.create({
  uiMessageHiddenItem: {
    minWidth: UI_HIDDEN_OPTION_WIDTH,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkGray,
    opacity: 1,
  },
  uiMessageHiddenItemText: {
    color: colors.white,
    fontSize: fontSize.base,
    fontWeight: fontWeight.bolder,
  },
  uiMessageHiddenItemPressed: {
    opacity: UI_PRESSED_OPACITY,
  },
})

export default UIMessageHiddenItem
