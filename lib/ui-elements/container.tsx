import { StyleSheet, View } from 'react-native'
import type { ViewProps } from 'react-native'

export type UIContainerProps = {
  centered?: boolean
} & ViewProps

const UIContainer = ({
  centered,
  children,
  style,
  ...otherProps
}: UIContainerProps) => (
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

UIContainer.defaultProps = {
  centered: false,
}

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
