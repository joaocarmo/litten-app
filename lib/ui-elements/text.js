/**
 * @format
 * @flow
 */

import { StyleSheet, Text } from 'react-native'
import colors from 'styles/colors'

const UIText: (args: any) => React$Node = ({
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
    fontSize: 14,
    fontWeight: '200',
  },
  uiTextSpacing: {
    paddingTop: 6,
    paddingBottom: 6,
    marginTop: 8,
    marginBottom: 8,
  },
  uiTextBold: {
    fontWeight: '700',
  },
  uiTextCentered: {
    textAlign: 'center',
  },
  uiTextSmall: {
    fontSize: 12,
  },
})

export default UIText
