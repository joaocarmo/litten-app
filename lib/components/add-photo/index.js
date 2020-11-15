/**
 * @format
 * @flow
 */

import ImagePicker from 'react-native-image-crop-picker'
import { UIActionSheet } from 'ui-elements'
import { imagePickerOptions } from 'config/image-picker/form-new'
import { cameraIsAvailable } from 'utils/platform'
import { logError } from 'utils/functions'
import { translate } from 'utils/i18n'

const AddPhoto: (args: any) => React$Node = ({
  ImageComponent,
  imageSource,
  onChange = (image) => null,
  PlaceholderComponent,
  ...otherProps
}) => {
  const source =
    imageSource && typeof imageSource === 'string'
      ? { uri: imageSource }
      : imageSource

  const openCamera = async () => {
    try {
      const cameraAvailable = await cameraIsAvailable()
      if (cameraAvailable) {
        const image = await ImagePicker.openCamera(imagePickerOptions)
        onChange(image)
      }
    } catch (err) {
      logError(err)
    }
  }

  const openImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker(imagePickerOptions)
      onChange(image)
    } catch (err) {
      logError(err)
    }
  }

  const showActionSheetAdd = () => {
    UIActionSheet(
      {
        options: [
          translate('cta.cancel'),
          translate('cta.openCamera'),
          translate('cta.fromLibrary'),
        ],
        destructiveButtonIndex: null,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          openCamera()
        } else if (buttonIndex === 2) {
          openImagePicker()
        }
      },
    )
  }

  const showActionSheetEdit = () => {
    UIActionSheet(
      {
        options: [
          translate('cta.cancel'),
          translate('cta.changePhoto'),
          translate('cta.removePhoto'),
        ],
        destructiveButtonIndex: null,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          showActionSheetAdd()
        } else if (buttonIndex === 2) {
          onChange(null)
        }
      },
    )
  }

  return source ? (
    <ImageComponent
      source={source}
      onPress={showActionSheetEdit}
      {...otherProps}
    />
  ) : (
    <PlaceholderComponent onPress={showActionSheetAdd} {...otherProps} />
  )
}

export default AddPhoto
