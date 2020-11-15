/**
 * @format
 * @flow
 */

import { useEffect } from 'react'
import { Alert, Pressable, StyleSheet, View } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import { UIButton, UIImage, UIText } from 'ui-elements'
import SelectPhoto from 'components/select-photo'
import { iconCamera } from 'images'
import { imagePickerOptions } from 'config/image-picker/step-photo'
import { logError } from 'utils/functions'
import { cameraIsAvailable } from 'utils/platform'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const StepPhoto: (args: any) => React$Node = ({
  formRegister: { avatar, error, errorMessage },
  setAvatar,
}) => {
  useEffect(() => {
    if (error?.avatar) {
      Alert.alert(errorMessage?.avatar)
    }
  }, [error, errorMessage])

  const openCamera = async () => {
    try {
      const cameraAvailable = await cameraIsAvailable()
      if (cameraAvailable) {
        const image = await ImagePicker.openCamera(imagePickerOptions)
        setAvatar({ uri: image.path })
      }
    } catch (err) {
      logError(err)
    }
  }

  const openImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker(imagePickerOptions)
      setAvatar({ uri: image.path })
    } catch (err) {
      logError(err)
    }
  }

  const changeAvatar = () => setAvatar(null)

  return (
    <View style={styles.container}>
      {!avatar && (
        <Pressable
          onPress={() => {
            openCamera()
          }}>
          <View style={styles.box}>
            <UIImage source={iconCamera} style={styles.icon} />
            <UIText noPadding style={styles.text}>
              {`${translate('forms.capturePhoto')}\n${translate(
                'forms.capturePhotoOr',
              )}`}
            </UIText>
            <UIButton onPress={openImagePicker} secondary style={styles.button}>
              {translate('forms.fromLibrary')}
            </UIButton>
          </View>
        </Pressable>
      )}
      {avatar && <SelectPhoto source={avatar} onChange={changeAvatar} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: 180,
    width: 330,
    borderColor: colors.lighterGray,
    borderWidth: 2.5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 42,
    width: 46,
    margin: 5,
  },
  text: {
    color: colors.darkGray,
    fontSize: 16,
    fontWeight: '600',
    margin: 5,
    textAlign: 'center',
  },
  button: {
    width: 140,
    height: 32,
  },
})

export default StepPhoto
