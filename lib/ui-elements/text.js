/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { StyleSheet, Text } from 'react-native'
import colors from 'styles/colors'
import { fontSize, fontWeight } from 'styles/typography'

const UIText: (args: any) => Node = ({
  bold = false,
  centered = false,
  children,
  noPadding = false,
  small = false,
  style,
  ...otherProps
}) =>
  typeof children === 'string' ? (
    <Text
      {...otherProps}
      style={[
        StyleSheet.compose(styles.uiText, style),
        noPadding ? undefined : styles.uiTextSpacing,
        bold ? styles.uiTextBold : undefined,
        centered ? styles.uiTextCentered : undefined,
        small ? styles.uiTextSmall : undefined,
      ]}>
      {children}
    </Text>
  ) : null

const styles = StyleSheet.create({
  uiText: {
    color: colors.black,
    fontSize: fontSize.base,
    fontWeight: fontWeight.lighter,
  },
  uiTextSpacing: {
    paddingTop: 6,
    paddingBottom: 6,
    marginTop: 8,
    marginBottom: 8,
  },
  uiTextBold: {
    fontWeight: fontWeight.bolder,
  },
  uiTextCentered: {
    textAlign: 'center',
  },
  uiTextSmall: {
    fontSize: fontSize.small,
  },
})

export default UIText
