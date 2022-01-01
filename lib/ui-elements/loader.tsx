import { useCallback } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useTheme } from '@hooks'
import { opacity2Hex } from '@utils/functions'
import { DEVICE_WIDTH } from '@utils/constants'

const UILoader = ({
  active = false,
  transparent = false,
  containerStyle,
  ...otherProps
}) => {
  const {
    createStyles,
    theme: { secondary: secondaryColor },
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
        backgroundColor: `${styles.uiLoader.backgroundColor}${opacity}`,
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
        color={secondaryColor}
        {...otherProps}
      />
    </View>
  )
}

export default UILoader
