import { memo, useCallback } from 'react'

import { StyleSheet, View } from 'react-native'
import UIImage from 'ui-elements/image'
import {
  USER_AVATAR_SIZE_LARGE,
  USER_AVATAR_SIZE_MEDIUM,
  USER_AVATAR_SIZE_MINI,
} from 'utils/constants'
type UIAvatarProps = {
  containerStyle: any
  resizeMode: string
  size: 'mini' | 'medium' | 'large'
  source:
    | string
    | {
        uri: string
      }
  style: any
}

const areEqual = (prevProps, nextProps) => {
  const prevSource =
    typeof prevProps.source === 'string'
      ? prevProps.source
      : prevProps.source.uri
  const nextSource =
    typeof nextProps.source === 'string'
      ? nextProps.source
      : nextProps.source.uri
  return (
    prevProps.resizeMode === nextProps.resizeMode &&
    prevProps.size === nextProps.size &&
    prevSource === nextSource
  )
}

const UIAvatar: (props: UIAvatarProps) => Node = ({
  containerStyle,
  resizeMode = 'cover',
  size = 'mini',
  source,
  style,
  ...otherProps
}) => {
  const getSize = useCallback(() => {
    switch (size) {
      case 'large':
        return styles.uiAvatarSizeLarge

      case 'medium':
        return styles.uiAvatarSizeMedium

      default:
        return styles.uiAvatarSizeMini
    }
  }, [size])
  return (
    <View style={[containerStyle, styles.uiAvatarImageContainer, getSize()]}>
      {source && (
        <UIImage
          {...{ ...otherProps, resizeMode, source, style: [getSize(), style] }}
        />
      )}
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
export default memo<UIAvatarProps>(
  UIAvatar,
  areEqual,
) as React$AbstractComponent<UIAvatarProps, unknown>
