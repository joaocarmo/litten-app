import ImagePicker from 'react-native-image-crop-picker'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { imagePickerOptions } from '@config/image-picker/form-new'
import { cameraIsAvailable } from '@utils/platform'
import { debugLog } from '@utils/dev'
import { translate } from '@utils/i18n'

const AddPhoto = ({
  ImageComponent,
  imageSource,
  onChange = (image) => null,
  PlaceholderComponent,
  ...otherProps
}) => {
  const { showActionSheetWithOptions } = useActionSheet()
  const source =
    imageSource && typeof imageSource === 'string'
      ? {
          uri: imageSource,
        }
      : imageSource

  const openCamera = async () => {
    try {
      const cameraAvailable = await cameraIsAvailable()

      if (cameraAvailable) {
        const image = await ImagePicker.openCamera(imagePickerOptions)
        onChange(image)
      }
    } catch (err) {
      debugLog(err)
    }
  }

  const openImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker(imagePickerOptions)
      onChange(image)
    } catch (err) {
      debugLog(err)
    }
  }

  const showActionSheetAdd = () => {
    const options = [
      translate('cta.openCamera'),
      translate('cta.fromLibrary'),
      translate('cta.cancel'),
    ]
    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex: null,
        cancelButtonIndex: options.length - 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          openCamera()
        } else if (buttonIndex === 1) {
          openImagePicker()
        }
      },
    )
  }

  const showActionSheetEdit = () => {
    const options = [
      translate('cta.changePhoto'),
      translate('cta.removePhoto'),
      translate('cta.cancel'),
    ]
    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex: null,
        cancelButtonIndex: options.length - 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          showActionSheetAdd()
        } else if (buttonIndex === 1) {
          onChange(null)
        }
      },
    )
  }

  if (source) {
    return (
      <ImageComponent
        source={source}
        onPress={showActionSheetEdit}
        {...otherProps}
      />
    )
  }

  return <PlaceholderComponent onPress={showActionSheetAdd} {...otherProps} />
}

export default AddPhoto
