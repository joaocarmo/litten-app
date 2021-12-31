import { StyleSheet, View } from 'react-native'

const UIContainer = ({ centered = false, children, style, ...otherProps }) => (
  <View
    {...otherProps}
    style={[
      styles.uiContainer,
      style,
      centered ? styles.uiContainerCentered : undefined,
    ]}
  >
    {children}
  </View>
)

const styles = StyleSheet.create({
  uiContainer: {
    width: '75%',
  },
  uiContainerCentered: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
export default UIContainer
