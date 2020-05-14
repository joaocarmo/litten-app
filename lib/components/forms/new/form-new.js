/**
 * @format
 * @flow strict-local
 */

import { isEmulator } from 'react-native-device-info'
import React from 'react'
import { ActionSheetIOS, Alert, StyleSheet, Text, View } from 'react-native'
import { UIImagePlaceholder, UIListItem, UIText } from 'ui-elements'
import ImagePicker from 'react-native-image-crop-picker'
import { iterateTimes, logError } from 'utils/functions'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const imageSize = 1000
const allowedNumPhotos = 8
const bulletSize = 10
const imagePickerOptions = {
  height: imageSize,
  width: imageSize,
  cropping: true,
  writeTempFile: true,
  includeBase64: false,
  avoidEmptySpaceAroundImage: true,
  cropperCircleOverlay: false,
  smartAlbums: [
    'PhotoStream',
    'Generic',
    'Favorites',
    'RecentlyAdded',
    'UserLibrary',
    'SelfPortraits',
    'LivePhotos',
  ],
  useFrontCamera: false,
  compressImageQuality: 0.8,
  loadingLabelText: translate('feedback.pleaseWait'),
  mediaType: 'photo',
  forceJpg: true,
  enableRotationGesture: true,
  cropperChooseText: translate('cta.choose'),
  cropperCancelText: translate('cta.cancel'),
}

const ItemContent: () => React$Node = ({ children }) => (
  <View style={styles.textContainer}>
    <View style={styles.itemBullet} />
    <Text style={styles.itemText}>{children}</Text>
  </View>
)

const NewForm: () => React$Node = ({
  formNew: { photos },
  addPhoto,
  updatePhoto,
  removePhoto,
}) => {
  const openCamera = async (index = null) => {
    try {
      const isCameraUnavailable = await isEmulator()
      if (isCameraUnavailable) {
        Alert.alert(translate('easterEggs.simulation'))
      } else {
        const image = await ImagePicker.openCamera(imagePickerOptions)
        if (index === null) {
          addPhoto({ uri: image.path })
        } else {
          updatePhoto({ uri: image.path }, index)
        }
      }
    } catch (err) {
      logError(err)
    }
  }

  const openImagePicker = async (index = null) => {
    try {
      const image = await ImagePicker.openPicker(imagePickerOptions)
      if (index === null) {
        addPhoto({ uri: image.path })
      } else {
        updatePhoto({ uri: image.path }, index)
      }
    } catch (err) {
      logError(err)
    }
  }

  const showActionSheetAdd = (index = null) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          translate('cta.cancel'),
          translate('screens.new.openCamera'),
          translate('screens.new.fromLibrary'),
        ],
        destructiveButtonIndex: null,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          openCamera(index)
        } else if (buttonIndex === 2) {
          openImagePicker(index)
        }
      },
    )
  }

  const showActionSheetEdit = (index = null) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          translate('cta.cancel'),
          translate('screens.new.changePhoto'),
          translate('screens.new.removePhoto'),
        ],
        destructiveButtonIndex: null,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          showActionSheetAdd(index)
        } else if (buttonIndex === 2) {
          removePhoto(index)
        }
      },
    )
  }

  return (
    <View style={styles.container}>
      <UIText>{translate('screens.new.addPhotos')}</UIText>
      <UIImagePlaceholder.Group>
        {iterateTimes(allowedNumPhotos).map((v, idx) =>
          photos[idx] ? (
            <UIImagePlaceholder.ImageItem
              key={idx}
              onPress={() => showActionSheetEdit(idx)}
              source={photos[idx]}
            />
          ) : (
            <UIImagePlaceholder.Item
              key={idx}
              actionable={idx === photos.length}
              onPress={() => showActionSheetAdd()}
            />
          ),
        )}
      </UIImagePlaceholder.Group>
      <View style={styles.formContainer}>
        <UIListItem>
          <ItemContent>{translate('screens.new.addTitle')}</ItemContent>
        </UIListItem>
        <UIListItem hasExtra>
          <ItemContent>{translate('screens.new.addType')}</ItemContent>
        </UIListItem>
        <UIListItem>
          <ItemContent>{translate('screens.new.addStory')}</ItemContent>
        </UIListItem>
        <UIListItem hasExtra>
          <ItemContent>{translate('screens.new.addLocation')}</ItemContent>
        </UIListItem>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  formContainer: {
    marginTop: 18,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemBullet: {
    height: bulletSize,
    width: bulletSize,
    borderRadius: bulletSize / 2,
    marginRight: 14,
    backgroundColor: colors.darkGray,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.blue,
  },
})

export default NewForm
