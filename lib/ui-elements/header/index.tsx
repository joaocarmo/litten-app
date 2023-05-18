import { StyleSheet, Text } from 'react-native'
import type { TextProps } from 'react-native'
import { useTheme } from '@hooks'
import uiHeaderStyles from '@ui-elements/header/index.styles'

export type UIHeaderProps = {
  centered?: boolean
  subheader?: boolean
  thin?: boolean
} & TextProps

const UIHeader = ({
  centered,
  children,
  style,
  subheader,
  thin,
  ...otherProps
}: UIHeaderProps) => {
  const { createStyles } = useTheme()

  const styles = createStyles(uiHeaderStyles)

  if (!children) {
    return null
  }

  return (
    <Text
      {...otherProps}
      style={[
        StyleSheet.compose(styles.uiHeader, style),
        centered ? styles.uiHeaderCentered : undefined,
        subheader ? styles.uiSubHeader : undefined,
        thin ? styles.uiHeaderThin : undefined,
      ]}
    >
      {children}
    </Text>
  )
}

UIHeader.defaultProps = {
  centered: false,
  subheader: false,
  thin: false,
}

export default UIHeader
