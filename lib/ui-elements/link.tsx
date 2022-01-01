import { StyleSheet, Text } from 'react-native'
import { useTheme } from '@hooks'

const UILink = ({ children, underline = true, style, ...otherProps }) => {
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

export default UILink
