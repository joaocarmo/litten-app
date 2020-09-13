/**
 * @format
 * @flow
 */

import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import { UI_HIDDEN_OPTION_WIDTH } from 'utils/constants'
import colors from 'styles/colors'

const UIMessageHiddenItem: (args: any) => React$Node = ({
  children,
  onLongPress,
  onPress,
  style,
  ...otherProps
}) => {
  const Container =
    typeof onPress === 'function' || typeof onLongPress === 'function'
      ? TouchableOpacity
      : View

  return (
    <Container
      onPress={onPress}
      onLongPress={onLongPress}
      style={StyleSheet.compose(styles.uiMessageHiddenItem, style)}
      {...otherProps}>
      {typeof children === 'string' ? (
        <Text style={styles.uiMessageHiddenItemText}>{children}</Text>
      ) : (
        children
      )}
    </Container>
  )
}

const styles = StyleSheet.create({
  uiMessageHiddenItem: {
    minWidth: UI_HIDDEN_OPTION_WIDTH,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkGray,
  },
  uiMessageHiddenItemText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
})

export default UIMessageHiddenItem
