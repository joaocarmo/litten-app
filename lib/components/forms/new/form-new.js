/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import {
  UIActionSheet,
  UIImagePlaceholder,
  UIListItem,
  UIText,
} from 'ui-elements'
import ImagePicker from 'react-native-image-crop-picker'
import { iterateTimes, logError, stringifyLocation } from 'utils/functions'
import { cameraIsAvailable } from 'utils/platform'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'
import { SCREEN_NEW_LOCATION } from 'utils/constants'

const littenTypes = [
  { key: 'adopt', label: translate('litten.type.adopt'), value: 'adopt' },
  { key: 'mate', label: translate('litten.type.mate'), value: 'mate' },
]

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
  addPhoto,
  formNew: { photos, story, title, type, location },
  removePhoto,
  setStory,
  setTitle,
  setType,
  updatePhoto,
}) => {
  const navigation = useNavigation()

  const openCamera = async (index = null) => {
    try {
      const cameraAvailable = await cameraIsAvailable()
      if (cameraAvailable) {
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
    UIActionSheet(
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
    UIActionSheet(
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

  const chooseType = () => {
    const options = [
      translate('cta.cancel'),
      ...littenTypes.map(({ label }) => label),
    ]

    UIActionSheet(
      {
        options,
        destructiveButtonIndex: null,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex > 0) {
          setType(littenTypes[buttonIndex - 1]?.key)
        }
      },
    )
  }

  const littenType = littenTypes.find(({ key }) => key === type)?.label

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
        <UIListItem onChangeText={setTitle} value={title} editable>
          {title || (
            <ItemContent>{translate('screens.new.addTitle')}</ItemContent>
          )}
        </UIListItem>
        <UIListItem onPress={chooseType} hasExtra>
          {littenType || (
            <ItemContent>{translate('screens.new.addType')}</ItemContent>
          )}
        </UIListItem>
        <UIListItem onChangeText={setStory} value={story} multiline editable>
          {story || (
            <ItemContent>{translate('screens.new.addStory')}</ItemContent>
          )}
        </UIListItem>
        <UIListItem
          onPress={() => navigation.navigate(SCREEN_NEW_LOCATION)}
          hasExtra>
          {stringifyLocation(location) || (
            <ItemContent>{translate('screens.new.addLocation')}</ItemContent>
          )}
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
