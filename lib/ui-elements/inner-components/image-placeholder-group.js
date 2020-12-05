/**
 * @format
 * @flow
 */

import { StyleSheet, View } from 'react-native'
import { UI_IMAGE_PLACEHOLDER_ITEM_MARGIN } from 'utils/constants'

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
    margin: -UI_IMAGE_PLACEHOLDER_ITEM_MARGIN,
  },
  lastRowFiller: {
    flexGrow: 1,
  },
})

export default UIImagePlaceholderGroup
