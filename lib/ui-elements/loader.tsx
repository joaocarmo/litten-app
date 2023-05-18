import { useCallback } from 'react'
import { ActivityIndicator, View } from 'react-native'
import type { ActivityIndicatorProps, ViewStyle } from 'react-native'
import { useTheme } from '@hooks'
import { opacity2Hex } from '@utils/functions'
import { DEVICE_WIDTH } from '@utils/constants'

export type UILoaderProps = {
  active?: boolean
  transparent?: boolean | number
  containerStyle?: ViewStyle
} & ActivityIndicatorProps

const UILoader = ({
  active,
  transparent,
  containerStyle,
  ...otherProps
}: UILoaderProps) => {
  const {
    createStyles,
    theme: { colors },
  } = useTheme()

  const styles = createStyles((theme) => ({
    uiLoader: {
      flex: 0,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      height: '100%',
      width: DEVICE_WIDTH,
      minWidth: '100%',
      top: 0,
      opacity: 1,
      zIndex: 1,
      backgroundColor: theme.colors.neutralLight,
    },
    uiLoaderTransparent: {
      backgroundColor: `${theme.colors.neutralLight}${opacity2Hex(80)}`,
    },
  }))

  const getTransparencyStyle = useCallback(() => {
    if (transparent === true) {
      return styles.uiLoaderTransparent
    }

    if (Number.isInteger(transparent)) {
      const opacity = opacity2Hex(100 - +transparent)
      return {
        backgroundColor: `${String(styles.uiLoader.backgroundColor)}${opacity}`,
      }
    }
  }, [styles.uiLoader.backgroundColor, styles.uiLoaderTransparent, transparent])

  if (!active) {
    return null
  }

  return (
    <View style={[styles.uiLoader, containerStyle, getTransparencyStyle()]}>
      <ActivityIndicator
        animating={active}
        color={colors.secondary}
        {...otherProps}
      />
    </View>
  )
}

UILoader.defaultProps = {
  active: false,
  transparent: false,
  containerStyle: undefined,
}

export default UILoader
