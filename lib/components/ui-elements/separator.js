/**
 * @format
 * @flow
 */

import { StyleSheet, View } from 'react-native'
import colors from 'styles/colors'

const UISeparator: (args: any) => React$Node = ({
  invisible = false,
  style,
  ...otherProps
}) => (
  <View
    {...otherProps}
    style={
      invisible
        ? StyleSheet.compose(styles.uiSeparator, style)
        : StyleSheet.compose(uiSeparatorVisible, style)
    }
  />
)

const styles = StyleSheet.create({
  uiSeparator: {
    marginTop: 20,
    marginBottom: 20,
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
