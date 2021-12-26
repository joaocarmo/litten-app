/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { StyleSheet } from 'react-native'
import Slider from '@react-native-community/slider'
import { useTheme } from 'hooks'

const UISlider: (args: any) => Node = ({ style, ...otherProps }) => {
  const {
    theme: { colors },
  } = useTheme()

  return (
    <Slider
      {...otherProps}
      minimumTrackTintColor={colors.primary}
      thumbTintColor={colors.background}
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
