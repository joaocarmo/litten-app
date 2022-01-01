import { StyleSheet, View } from 'react-native'
import { useTheme } from '@hooks'

const UISeparator = ({
  invisible = false,
  small = false,
  style,
  ...otherProps
}) => {
  const { createStyles } = useTheme()

  const styles = createStyles((theme) => ({
    uiSeparator: {
      marginTop: 20,
      marginBottom: 20,
    },
    uiSeparatorSmall: {
      marginTop: 10,
      marginBottom: 10,
    },
    uiSeparatorVisible: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: theme.colors.neutral,
    },
  }))
  const uiSeparatorVisible = StyleSheet.compose(
    styles.uiSeparator,
    styles.uiSeparatorVisible,
  )

  return (
    <View
      {...otherProps}
      style={[
        invisible
          ? StyleSheet.compose(styles.uiSeparator, style)
          : StyleSheet.compose(uiSeparatorVisible, style),
        small ? styles.uiSeparatorSmall : undefined,
      ]}
    />
  )
}

export default UISeparator
