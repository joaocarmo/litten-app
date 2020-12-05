/**
 * @format
 * @flow
 */

import { StyleSheet, View } from 'react-native'
import colors from 'styles/colors'

const UISeparator: (args: any) => React$Node = ({
  invisible = false,
  small = false,
  style,
  ...otherProps
}) => (
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

const styles = StyleSheet.create({
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
    backgroundColor: colors.gray,
  },
})

const uiSeparatorVisible = StyleSheet.compose(
  styles.uiSeparator,
  styles.uiSeparatorVisible,
)

export default UISeparator
