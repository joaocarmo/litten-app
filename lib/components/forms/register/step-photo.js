/**
 * @format
 * @flow strict-local
 */

import { isEmulator } from 'react-native-device-info'
import React, { useState } from 'react'
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
import { iconCamera } from 'images'

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

const StepPhoto: () => React$Node = () => {
  const [selectedImage, setSelectedImage] = useState(false)
  const [avatar, setAvatar] = useState(null)

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
        setSelectedImage(true)
      }
    } catch (err) {
      console.warn(err)
    }
  }

  const openImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker(imagePickerOptions)
      setAvatar({ uri: image.path })
      setSelectedImage(true)
    } catch (err) {
      console.warn(err)
    }
  }

  return (
    <View style={styles.container}>
      {!selectedImage && (
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
      {selectedImage && avatar && (
        <Image
          source={avatar}
          resizeMode="contain"
          style={styles.imagePreview}
        />
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
  imagePreview: {
    height: imageSize,
    width: imageSize,
    borderRadius: Math.ceil(imageSize / 2),
  },
})

export default StepPhoto
