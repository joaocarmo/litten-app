/**
 * @format
 * @flow strict-local
 */

import { isEmulator } from 'react-native-device-info'
import React, { useEffect } from 'react'
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import { UIButton } from 'ui-elements'
import colors from 'styles/colors'
import { iconCamera, iconEditImage } from 'images'

const imageSize = 200

const imagePickerOptions = {
  height: imageSize,
  width: imageSize,
  cropping: true,
  writeTempFile: true,
  includeBase64: false,
  avoidEmptySpaceAroundImage: true,
  cropperCircleOverlay: true,
  smartAlbums: [
    'PhotoStream',
    'Generic',
    'Favorites',
    'RecentlyAdded',
    'UserLibrary',
    'SelfPortraits',
    'LivePhotos',
  ],
  useFrontCamera: true,
  compressImageQuality: 0.8,
  loadingLabelText: 'Please wait...',
  mediaType: 'photo',
  forceJpg: true,
  enableRotationGesture: true,
}

const StepPhoto: () => React$Node = ({
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
      const isCameraUnavailable = await isEmulator()
      if (isCameraUnavailable) {
        Alert.alert(
          "We're inside a huge simulation chamber on an alien spaceship.",
        )
      } else {
        const image = await ImagePicker.openCamera(imagePickerOptions)
        setAvatar({ uri: image.path })
      }
    } catch (err) {
      console.warn(err)
    }
  }

  const openImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker(imagePickerOptions)
      setAvatar({ uri: image.path })
    } catch (err) {
      console.warn(err)
    }
  }

  const changeAvatar = () => {
    Alert.alert('Change Photo', 'Do you want to replace the current photo?', [
      {
        text: 'Change',
        onPress: () => setAvatar(null),
      },
      {
        text: 'Cancel',
        onPress: () => null,
      },
    ])
  }

  return (
    <View style={styles.container}>
      {!avatar && (
        <TouchableWithoutFeedback onPress={openCamera}>
          <View style={styles.box}>
            <Image source={iconCamera} style={styles.icon} />
            <Text style={styles.text}>
              Take a profile picture{'\n'}
              or
            </Text>
            <UIButton onPress={openImagePicker} secondary style={styles.button}>
              From library
            </UIButton>
          </View>
        </TouchableWithoutFeedback>
      )}
      {avatar && (
        <TouchableWithoutFeedback onPress={changeAvatar}>
          <View style={styles.imageContainer}>
            <Image
              source={iconEditImage}
              resizeMode="contain"
              style={styles.imageEdit}
            />
            <Image
              source={avatar}
              resizeMode="contain"
              style={styles.imagePreview}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: 180,
    width: 330,
    borderColor: colors.borderColor,
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
  imageContainer: {
    display: 'flex',
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
    height: imageSize,
    width: imageSize,
    borderRadius: Math.ceil(imageSize / 2),
  },
})

export default StepPhoto
