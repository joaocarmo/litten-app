import { StyleSheet, Text } from 'react-native'
import type { TextProps } from 'react-native'
import { useTheme } from '@hooks'

export type UILinkProps = {
  underline?: boolean
} & TextProps

const UILink = ({ children, underline, style, ...otherProps }: UILinkProps) => {
  const { createStyles } = useTheme()

  const styles = createStyles((theme) => ({
    uiLink: {
      color: theme.colors.secondary,
      textDecorationLine: 'underline',
    },
    uiLinkNoUnderline: {
      color: theme.colors.secondary,
      textDecorationLine: 'none',
    },
  }))

  return (
    <Text
      {...otherProps}
      style={StyleSheet.compose(
        underline ? styles.uiLink : styles.uiLinkNoUnderline,
        style,
      )}
    >
      {children}
    </Text>
  )
}

UILink.defaultProps = {
  underline: true,
}

export default UILink
