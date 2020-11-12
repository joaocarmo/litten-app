/**
 * @format
 * @flow
 */

import { Alert, Pressable, StyleSheet } from 'react-native'
import { UIImage } from 'ui-elements'
import { iconEditImage, placeholderUser } from 'images'
import { USER_AVATAR_SIZE_LARGE } from 'utils/constants'
import { translate } from 'utils/i18n'

const SelectPhoto: (args: any) => React$Node = ({
  photoURL,
  onChange,
  ...otherProps
}) => {
  const source =
    typeof photoURL === 'string'
      ? { uri: photoURL }
      : photoURL ?? placeholderUser

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

  return (
    <Pressable
      onPress={handleSetPhoto}
      style={styles.imageContainer}
      {...otherProps}>
      <UIImage source={iconEditImage} style={styles.imageEdit} />
      <UIImage source={source} style={styles.imagePreview} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  editContainer: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageEdit: {
    height: 24,
    width: 24,
    top: 42,
    left: 72,
    zIndex: 1,
  },
  imagePreview: {
    height: USER_AVATAR_SIZE_LARGE,
    width: USER_AVATAR_SIZE_LARGE,
    borderRadius: USER_AVATAR_SIZE_LARGE / 2,
  },
})

export default SelectPhoto
