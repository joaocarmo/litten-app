import { StyleSheet, Text } from 'react-native'
import { useTheme } from 'hooks'

const UIHeader = ({
  centered = false,
  children,
  style,
  subheader = false,
  thin = false,
  ...otherProps
}) => {
  const { createStyles } = useTheme()
  const styles = createStyles((theme, typography) => ({
    uiHeader: {
      fontSize: typography.fontSize.xxxxlarge,
      fontWeight: typography.fontWeight.bolder,
      color: theme.colors.text,
      paddingTop: 2,
      paddingBottom: 2,
      marginTop: 2,
      marginBottom: 2,
    },
    uiHeaderThin: {
      fontWeight: typography.fontWeight.lighter,
    },
    uiSubHeader: {
      fontSize: typography.fontSize.large,
    },
    uiHeaderCentered: {
      textAlign: 'center',
    },
  }))

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

export default UIHeader
