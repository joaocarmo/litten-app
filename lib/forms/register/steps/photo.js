/**
 * @format
 * @flow
 */

import { vh, vw } from 'react-native-expo-viewport-units'
import { useEffect } from 'react'
import { Alert, Pressable, StyleSheet, View } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import { UIButton, UIText } from 'ui-elements'
import SelectPhoto from 'components/select-photo'
import { Camera as CameraIcon } from 'images/components/icons'
import { imagePickerOptions } from 'config/image-picker/step-photo'
import { debugLog } from 'utils/dev'
import { getImagePath } from 'utils/functions'
import { cameraIsAvailable } from 'utils/platform'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'
import { fontSize, fontWeight } from 'styles/typography'

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
        const imagePath = getImagePath(image)
        setAvatar({ uri: imagePath })
      }
    } catch (err) {
      debugLog(err)
    }
  }

  const openImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker(imagePickerOptions)
      const imagePath = getImagePath(image)
      setAvatar({ uri: imagePath })
    } catch (err) {
      debugLog(err)
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
            <CameraIcon
              height={42}
              width={46}
              fill={colors.blue}
              style={styles.icon}
            />
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
      {avatar && (
        <SelectPhoto
          source={avatar}
          onChange={changeAvatar}
          imageStyle={styles.imageStyle}
        />
      )}
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
    height: vh(32),
    width: vw(85),
    maxHeight: 180,
    maxWidth: 330,
    borderColor: colors.lighterGray,
    borderWidth: 2.5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    margin: 5,
  },
  text: {
    color: colors.darkGray,
    fontSize: fontSize.large,
    fontWeight: fontWeight.bolder,
    margin: 5,
    textAlign: 'center',
  },
  button: {
    width: vw(40),
    maxWidth: 140,
    minHeight: 32,
  },
  imageStyle: {
    maxHeight: vh(30),
    maxWidth: vh(30),
  },
})

export default StepPhoto
