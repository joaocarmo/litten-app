/**
 * @format
 * @flow
 */

import { useEffect, useRef } from 'react'
import type { Node } from 'react'
import { Animated, Pressable, Text } from 'react-native'
import { useTheme } from 'hooks'
import { elevated as elevatedStyle } from 'styles/common'

const UITooltip: (args: any) => Node = ({
  animated = true,
  children,
  ...otherProps
}) => {
  const { createStyles } = useTheme()

  const fadeAnim = useRef(new Animated.Value(0)).current
  const descendAnim = useRef(new Animated.Value(0)).current
  const finalTopPosition = 12
  const finalOpacity = 1

  const styles = createStyles((theme, typography) => ({
    uiTooltipContainer: {
      position: 'absolute',
      top: 0,
      opacity: 0,
      zIndex: 1,
    },
    uiTooltip: {
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 14,
      paddingRight: 14,
      borderRadius: 16,
      backgroundColor: theme.colors.secondaryLight,
    },
    uiTooltipPressed: {
      backgroundColor: theme.colors.secondary,
    },
    uiTooltipText: {
      fontWeight: typography.fontWeight.bolder,
      color: theme.colors.textAlt,
    },
  }))

  const appearIn = () => {
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
  }

  useEffect(() => {
    animated && appearIn()
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
      ]}>
      <Pressable
        style={({ pressed }) => [
          elevatedStyle,
          styles.uiTooltip,
          pressed ? styles.uiTooltipPressed : undefined,
        ]}
        {...otherProps}>
        {typeof children === 'string' ? (
          <Text style={styles.uiTooltipText}>{children}</Text>
        ) : (
          children
        )}
      </Pressable>
    </Animated.View>
  )
}

export default UITooltip
