import { StyleSheet, Text } from 'react-native'
import type { TextProps } from 'react-native'
import { useTheme } from '@hooks'

export type UITextProps = {
  bold?: boolean
  centered?: boolean
  noPadding?: boolean
  small?: boolean
} & TextProps

const UIText = ({
  bold,
  centered,
  children,
  noPadding,
  small,
  style,
  ...otherProps
}: UITextProps) => {
  const { createStyles } = useTheme()

  const styles = createStyles((theme, typography) => ({
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
      ]}
    >
      {children}
    </Text>
  )
}

UIText.defaultProps = {
  bold: false,
  centered: false,
  noPadding: false,
  small: false,
}

export default UIText
