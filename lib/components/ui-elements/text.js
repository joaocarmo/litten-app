/**
 * @format
 * @flow
 */

import React from 'react'
import { StyleSheet, Text } from 'react-native'
import colors from 'styles/colors'

const UIText: (args: any) => React$Node = ({
  bold = false,
  children,
  small = false,
  style,
  ...otherProps
}) =>
  children ? (
    <Text
      {...otherProps}
      style={[
        StyleSheet.compose(styles.uiText, style),
        bold ? styles.uiTextBold : undefined,
        small ? styles.uiTextSmall : undefined,
      ]}>
      {children}
    </Text>
  ) : null

const styles = StyleSheet.create({
  uiText: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '200',
    paddingTop: 6,
    paddingBottom: 6,
    marginTop: 8,
    marginBottom: 8,
  },
  uiTextBold: {
    fontWeight: '600',
  },
  uiTextSmall: {
    fontSize: 12,
  },
})

export default UIText
