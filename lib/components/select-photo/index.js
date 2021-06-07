/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { Alert, Pressable, StyleSheet } from 'react-native'
import { UIImage } from 'ui-elements'
import { placeholderUser } from 'images'
import { Edit as EditIcon } from 'images/components/icons'
import { UI_ICON_SIZE_MINI, USER_AVATAR_SIZE_LARGE } from 'utils/constants'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const SelectPhoto: (args: any) => Node = ({
  imageStyle,
  onChange,
  source: imageSource,
  ...otherProps
}) => {
  const source =
    imageSource && typeof imageSource === 'string'
      ? { uri: imageSource }
      : imageSource ?? placeholderUser

  const handleSetPhoto = () => {
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
  }

  const getEditIconOffset = () => {
    const size =
      imageStyle?.maxHeight || imageStyle?.height || USER_AVATAR_SIZE_LARGE

    return 0.07 * size
  }

  return (
    <Pressable
      onPress={handleSetPhoto}
      style={styles.imageContainer}
      {...otherProps}>
      <EditIcon
        height={UI_ICON_SIZE_MINI}
        width={UI_ICON_SIZE_MINI}
        fill={colors.blue}
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
