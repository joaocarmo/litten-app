import { useCallback, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { Animated, Pressable, Text } from 'react-native'
import type { PressableProps } from 'react-native'
import { useTheme } from '@hooks'
import tooltipComponentStyles from '@ui-elements/tooltip/index.styles'

type UITooltipProps = {
  animated?: boolean
  children: ReactNode
} & PressableProps

const finalTopPosition = 12
const finalOpacity = 1

const UITooltip = ({ animated, children, ...otherProps }: UITooltipProps) => {
  const {
    createStyles,
    commonStyles: {
      commonStyles: { elevated: elevatedStyle },
    },
  } = useTheme()

  const fadeAnim = useRef(new Animated.Value(0)).current
  const descendAnim = useRef(new Animated.Value(0)).current

  const styles = createStyles(tooltipComponentStyles)

  const appearIn = useCallback(() => {
    const duration = 250
    const useNativeDriver = false

    Animated.timing(fadeAnim, {
      toValue: finalOpacity,
      duration,
      useNativeDriver,
    }).start()
    Animated.timing(descendAnim, {
      toValue: finalTopPosition,
      duration,
      useNativeDriver,
    }).start()
  }, [descendAnim, fadeAnim])

  useEffect(() => {
    if (animated) {
      appearIn()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Animated.View
      style={[
        styles.uiTooltipContainer,
        {
          top: animated ? descendAnim : finalTopPosition,
          opacity: animated ? fadeAnim : finalOpacity,
        },
      ]}
    >
      <Pressable
        style={({ pressed }) => [
          elevatedStyle,
          styles.uiTooltip,
          pressed ? styles.uiTooltipPressed : undefined,
        ]}
        {...otherProps}
      >
        {typeof children === 'string' ? (
          <Text style={styles.uiTooltipText}>{children}</Text>
        ) : (
          children
        )}
      </Pressable>
    </Animated.View>
  )
}

UITooltip.defaultProps = {
  animated: true,
}

export default UITooltip
