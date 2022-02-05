import { useCallback, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { ViewStyle } from 'react-native'
import UIImage from '@ui-elements/image'
import type { UIImageProps } from '@ui-elements/image'
import { placeholderUser } from '@images'
import {
  USER_AVATAR_SIZE_LARGE,
  USER_AVATAR_SIZE_MEDIUM,
  USER_AVATAR_SIZE_MINI,
} from '@utils/constants'

type UIAvatarProps = {
  containerStyle: ViewStyle
  resizeMode: string
  size: 'mini' | 'medium' | 'large'
} & UIImageProps

const UIAvatar = ({
  containerStyle: propsContainerStyle,
  resizeMode = 'cover',
  size = 'mini',
  source: propsSource,
  style,
  ...otherProps
}: UIAvatarProps) => {
  const source = useMemo(() => propsSource || placeholderUser, [propsSource])

  const getSize = useCallback(() => {
    switch (size) {
      case 'large':
        return styles.uiAvatarSizeLarge

      case 'medium':
        return styles.uiAvatarSizeMedium

      default:
        // mini
        return styles.uiAvatarSizeMini
    }
  }, [size])

  const containerStyle = useMemo(
    () => [styles.uiAvatarImageContainer, getSize(), propsContainerStyle],
    [propsContainerStyle, getSize],
  )
  const imageStyle = useMemo(() => [getSize(), style], [getSize, style])

  return (
    <View style={containerStyle}>
      <UIImage
        source={source}
        resizeMode={resizeMode}
        style={imageStyle}
        {...otherProps}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  uiAvatarImageContainer: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uiAvatarSizeLarge: {
    height: USER_AVATAR_SIZE_LARGE,
    width: USER_AVATAR_SIZE_LARGE,
    borderRadius: USER_AVATAR_SIZE_LARGE,
  },
  uiAvatarSizeMedium: {
    height: USER_AVATAR_SIZE_MEDIUM,
    width: USER_AVATAR_SIZE_MEDIUM,
    borderRadius: USER_AVATAR_SIZE_MEDIUM,
  },
  uiAvatarSizeMini: {
    height: USER_AVATAR_SIZE_MINI,
    width: USER_AVATAR_SIZE_MINI,
    borderRadius: USER_AVATAR_SIZE_MINI,
  },
})

export default UIAvatar
