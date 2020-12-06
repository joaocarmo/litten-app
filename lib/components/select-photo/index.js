/**
 * @format
 * @flow
 */

import { Alert, Pressable, StyleSheet } from 'react-native'
import { UIImage } from 'ui-elements'
import { placeholderUser } from 'images'
import { Edit as EditIcon } from 'images/components/icons'
import { USER_AVATAR_SIZE_LARGE } from 'utils/constants'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const SelectPhoto: (args: any) => React$Node = ({
  source: imageSource,
  onChange,
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

  return (
    <Pressable
      onPress={handleSetPhoto}
      style={styles.imageContainer}
      {...otherProps}>
      <EditIcon
        height={24}
        width={24}
        fill={colors.blue}
        style={styles.imageEdit}
      />
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
