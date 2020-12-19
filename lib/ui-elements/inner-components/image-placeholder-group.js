/**
 * @format
 * @flow
 */

import { StyleSheet, View } from 'react-native'

const UIImagePlaceholderGroup: (args: any) => React$Node = ({
  children,
  style,
  withFiller = false,
  ...otherProps
}) => (
  <View
    {...otherProps}
    style={StyleSheet.compose(styles.groupContainer, style)}>
    {children}
    {withFiller && <View style={styles.lastRowFiller} />}
  </View>
)

const styles = StyleSheet.create({
  groupContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  lastRowFiller: {
    flexGrow: 1,
  },
})

export default UIImagePlaceholderGroup
