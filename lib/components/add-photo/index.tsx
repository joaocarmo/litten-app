import { ComponentType, useCallback, useMemo } from 'react'
import type { ImageProps } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import type { ImageOrVideo } from 'react-native-image-crop-picker'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { imagePickerOptions } from '@config/image-picker/form-new'
import { cameraIsAvailable } from '@utils/platform'
import { debugLog } from '@utils/dev'
import { translate } from '@utils/i18n'
import type { ImageSource } from '@ui-elements/types'

export type AddPhotoProps<T = any> = {
  ImageComponent: ComponentType<T>
  imageSource: ImageSource
  onChange?: (image: ImageOrVideo | null) => void
  PlaceholderComponent: ComponentType<T>
} & T &
  Omit<ImageProps, 'source'>

const AddPhoto = ({
  ImageComponent,
  imageSource,
  onChange,
  PlaceholderComponent,
  ...otherProps
}: AddPhotoProps) => {
  const { showActionSheetWithOptions } = useActionSheet()

  const source = useMemo(
    () =>
      imageSource && typeof imageSource === 'string'
        ? {
            uri: imageSource,
          }
        : imageSource,
    [imageSource],
  )

  const openCamera = useCallback(async () => {
    try {
      const cameraAvailable = await cameraIsAvailable()

      if (cameraAvailable) {
        const image = await ImagePicker.openCamera(imagePickerOptions)
        onChange(image)
      }
    } catch (err) {
      debugLog(err)
    }
  }, [onChange])

  const openImagePicker = useCallback(async () => {
    try {
      const image = await ImagePicker.openPicker(imagePickerOptions)
      onChange(image)
    } catch (err) {
      debugLog(err)
    }
  }, [onChange])

  const showActionSheetAdd = useCallback(() => {
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
  }, [openCamera, openImagePicker, showActionSheetWithOptions])

  const showActionSheetEdit = useCallback(() => {
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
  }, [onChange, showActionSheetAdd, showActionSheetWithOptions])

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

AddPhoto.defaultProps = {
  onChange: () => null,
}

export default AddPhoto
