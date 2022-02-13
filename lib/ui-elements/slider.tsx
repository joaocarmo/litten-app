import { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import Slider from '@react-native-community/slider'
import type { SliderProps } from '@react-native-community/slider'
import { useTheme } from '@hooks'

export type UISliderProps = {
  style?: SliderProps['style']
}

const UISlider = ({ style: propsStyle, ...otherProps }: UISliderProps) => {
  const {
    theme: { colors },
  } = useTheme()

  const style = useMemo<typeof propsStyle>(
    () => [styles.uiSlider, propsStyle],
    [propsStyle],
  )

  return (
    <Slider
      minimumTrackTintColor={colors.secondaryLight}
      thumbTintColor={colors.primary}
      style={style}
      {...otherProps}
    />
  )
}

const styles = StyleSheet.create({
  uiSlider: {
    height: 80,
  },
})

export default UISlider
