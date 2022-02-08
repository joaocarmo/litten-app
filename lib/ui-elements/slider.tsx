import { StyleSheet } from 'react-native'
import Slider from '@react-native-community/slider'
import { useTheme } from '@hooks'

const UISlider = ({ style, ...otherProps }) => {
  const {
    theme: { colors },
  } = useTheme()

  return (
    <Slider
      {...otherProps}
      minimumTrackTintColor={String(colors.secondaryLight)}
      thumbTintColor={String(colors.primary)}
      style={[styles.uiSlider, style]}
    />
  )
}

const styles = StyleSheet.create({
  uiSlider: {
    height: 80,
  },
})
export default UISlider
