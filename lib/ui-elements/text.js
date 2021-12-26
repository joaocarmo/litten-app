/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { StyleSheet, Text } from 'react-native'
import { useTheme } from 'hooks'

const UIText: (args: any) => Node = ({
  bold = false,
  centered = false,
  children,
  noPadding = false,
  small = false,
  style,
  ...otherProps
}) => {
  const { createStyles, typography } = useTheme()

  const styles = createStyles((theme) => ({
    uiText: {
      color: theme.colors.text,
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.lighter,
    },
    uiTextSpacing: {
      paddingTop: 6,
      paddingBottom: 6,
      marginTop: 8,
      marginBottom: 8,
    },
    uiTextBold: {
      fontWeight: typography.fontWeight.bolder,
    },
    uiTextCentered: {
      textAlign: 'center',
    },
    uiTextSmall: {
      fontSize: typography.fontSize.small,
    },
  }))

  if (typeof children !== 'string') {
    return null
  }

  return (
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
  )
}

export default UIText
