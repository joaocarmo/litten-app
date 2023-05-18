import { useCallback } from 'react'
import { Alert, Pressable, StyleSheet } from 'react-native'
import type { AlertButton, PressableProps } from 'react-native'
import { useTheme } from '@hooks'
import { UIImage } from '@ui-elements'
import { placeholderUser } from '@images'
import { Edit as EditIcon } from '@images/components/icons'
import { UI_ICON_SIZE_MINI, USER_AVATAR_SIZE_LARGE } from '@utils/constants'
import { translate } from '@utils/i18n'
import type { UIImageProps } from '@ui-elements/image'

export interface SelectPhotoProps extends PressableProps {
  imageStyle: UIImageProps['style']
  onChange: AlertButton['onPress']
  source?: UIImageProps['source']
  height?: number
  maxHeight?: number
}

const SelectPhoto = ({
  imageStyle,
  onChange,
  source,
  height,
  maxHeight,
  ...otherProps
}: SelectPhotoProps) => {
  const {
    theme: { colors },
  } = useTheme()

  const handleSetPhoto = useCallback(() => {
    Alert.alert(
      translate('forms.changePhoto'),
      translate('forms.changePhotoDescription'),
      [
        {
          text: translate('cta.change'),
          onPress: onChange,
        },
        {
          text: translate('cta.cancel'),
          onPress: () => null,
        },
      ],
    )
  }, [onChange])

  const getEditIconOffset = useCallback(() => {
    const size = maxHeight || height || USER_AVATAR_SIZE_LARGE

    return 0.07 * size
  }, [height, maxHeight])

  return (
    <Pressable
      onPress={handleSetPhoto}
      style={styles.imageContainer}
      {...otherProps}
    >
      <EditIcon
        height={UI_ICON_SIZE_MINI}
        width={UI_ICON_SIZE_MINI}
        fill={colors.secondary}
        style={[
          styles.imageEdit,
          {
            top: getEditIconOffset(),
            right: getEditIconOffset(),
          },
        ]}
      />
      <UIImage source={source} style={[styles.imagePreview, imageStyle]} />
    </Pressable>
  )
}

SelectPhoto.defaultProps = {
  source: placeholderUser,
  height: 0,
  maxHeight: 0,
}

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageEdit: {
    position: 'absolute',
    zIndex: 1,
  },
  imagePreview: {
    height: USER_AVATAR_SIZE_LARGE,
    width: USER_AVATAR_SIZE_LARGE,
    borderRadius: USER_AVATAR_SIZE_LARGE / 2,
  },
})

export default SelectPhoto
