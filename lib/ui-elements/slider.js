/**
 * @format
 * @flow
 */

import { StyleSheet } from 'react-native'
import Slider from '@react-native-community/slider'
import colors from 'styles/colors'

const UISlider: (args: any) => React$Node = ({ style, ...otherProps }) => (
  <Slider
    {...otherProps}
    minimumTrackTintColor={colors.purple}
    thumbTintColor={colors.white}
    style={[styles.uiSlider, style]}
  />
)

const styles = StyleSheet.create({
  uiSlider: {
    height: 80,
  },
})

export default UISlider
