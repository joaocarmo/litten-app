import { StyleSheet, Text } from 'react-native'
import type { TextProps } from 'react-native'
import { useTheme } from '@hooks'
import textComponentStyles from '@ui-elements/text/index.styles'

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

  const styles = createStyles(textComponentStyles)

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
