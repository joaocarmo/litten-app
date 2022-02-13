import { StyleSheet, View } from 'react-native'
import type { ViewProps } from 'react-native'

export type UIImagePlaceholderGroupProps = {
  withFiller?: boolean
} & ViewProps

const UIImagePlaceholderGroup = ({
  children,
  style,
  withFiller,
  ...otherProps
}) => (
  <View
    style={StyleSheet.compose(styles.groupContainer, style)}
    {...otherProps}
  >
    {children}
    {withFiller && <View style={styles.lastRowFiller} />}
  </View>
)

UIImagePlaceholderGroup.defaultProps = {
  withFiller: false,
}

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
