/**
 * @format
 * @flow
 */

import { vh, vw } from 'react-native-expo-viewport-units'
import { useCallback, useEffect } from 'react'
import type { Node } from 'react'
import { Alert, Pressable, View } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import { useTheme } from 'hooks'
import { UIButton, UIText } from 'ui-elements'
import SelectPhoto from 'components/select-photo'
import { Camera as CameraIcon } from 'images/components/icons'
import { imagePickerOptions } from 'config/image-picker/step-photo'
import { debugLog } from 'utils/dev'
import { getImagePath } from 'utils/functions'
import { cameraIsAvailable } from 'utils/platform'
import { translate } from 'utils/i18n'

const StepPhoto: (args: any) => Node = ({
  formRegister: { avatar, error, errorMessage },
  setAvatar,
}) => {
  const {
    createStyles,
    theme: { colors },
    typography,
  } = useTheme()

  const styles = createStyles((theme) => ({
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
      borderColor: theme.colors.neutralLight,
      borderWidth: 2.5,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      margin: 5,
    },
    text: {
      color: theme.colors.neutralDark,
      fontSize: typography.fontSize.large,
      fontWeight: typography.fontWeight.bolder,
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
  }))

  useEffect(() => {
    if (error?.avatar) {
      Alert.alert(errorMessage?.avatar)
    }
  }, [error, errorMessage])

  const openCamera = useCallback(async () => {
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
  }, [setAvatar])

  const openImagePicker = useCallback(async () => {
    try {
      const image = await ImagePicker.openPicker(imagePickerOptions)
      const imagePath = getImagePath(image)
      setAvatar({ uri: imagePath })
    } catch (err) {
      debugLog(err)
    }
  }, [setAvatar])

  const changeAvatar = useCallback(() => setAvatar(null), [setAvatar])

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
              fill={colors.secondary}
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

export default StepPhoto
