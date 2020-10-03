/**
 * @format
 * @flow
 */

import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert, StyleSheet, View } from 'react-native'
import {
  UIActionSheet,
  UIButton,
  UIImagePlaceholder,
  UIInput,
  UIListItem,
  UISeparator,
  UISwitch,
  UIText,
  UITextArea,
} from 'ui-elements'
import ImagePicker from 'react-native-image-crop-picker'
import { iterateTimes, logError, stringifyLocation } from 'utils/functions'
import { cameraIsAvailable } from 'utils/platform'
import { translate } from 'utils/i18n'
import { SCREEN_LITTEN_POST, SCREEN_NEW_LOCATION } from 'utils/constants'
import { littenSpeciesList, littenTypes } from 'utils/litten'

const imageSize = 1000
const allowedNumPhotos = 8
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

const NewForm: (args: any) => React$Node = ({
  addPhoto,
  clearNewForm,
  formNew: { photos, story, title, species, type, location, useExtraInfo },
  removePhoto,
  setSpecies,
  setStory,
  setTitle,
  setType,
  setUseExtraInfo,
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

  const chooseSpecies = () => {
    const options = [
      translate('cta.cancel'),
      ...littenSpeciesList.map(({ label }) => label),
    ]

    UIActionSheet(
      {
        options,
        destructiveButtonIndex: null,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex > 0) {
          setSpecies(littenSpeciesList[buttonIndex - 1]?.key)
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

  const clearForm = () => {
    Alert.alert(
      translate('cta.clearForm'),
      translate('feedback.confirmMessages.clearForm'),
      [
        {
          text: translate('cta.yes'),
          onPress: () => clearNewForm(),
          style: 'destructive',
        },
        {
          text: translate('cta.no'),
          onPress: () => null,
        },
        { cancelable: false },
      ],
    )
  }

  const littenSpecies = littenSpeciesList.find(({ key }) => key === species)
    ?.label
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
        <UIText>{translate('screens.new.addTitle')}</UIText>
        <UIInput
          placeholder={translate('screens.new.addTitle')}
          onChangeText={setTitle}
          value={title}
          size="small"
        />
        <View style={styles.uiSpacer} />
        <UIText>{translate('screens.new.addSpecies')}</UIText>
        <UIListItem onPress={chooseSpecies} hasExtra>
          {littenSpecies || translate('screens.new.addSpecies')}
        </UIListItem>
        <View style={styles.uiSpacer} />
        <UIText>{translate('screens.new.addType')}</UIText>
        <UIListItem onPress={chooseType} hasExtra>
          {littenType || translate('screens.new.addType')}
        </UIListItem>
        <UISeparator />
        <UIText>{translate('screens.new.addStory')}</UIText>
        <UITextArea
          placeholder={translate('screens.new.addStory')}
          onChangeText={setStory}>
          {story}
        </UITextArea>
        <UISeparator />
        <UIText>{translate('screens.new.addLocation')}</UIText>
        <UIListItem
          onPress={() => navigation.navigate(SCREEN_NEW_LOCATION)}
          hasExtra>
          {stringifyLocation(location) || translate('screens.new.addLocation')}
        </UIListItem>
        <UISwitch value={useExtraInfo} onValueChange={setUseExtraInfo}>
          {translate('screens.new.useExtraInfo')}
        </UISwitch>
        {useExtraInfo && (
          <>
            <View style={styles.uiSpacer} />
            <UIText>{translate('easterEggs.placeholder')}</UIText>
          </>
        )}
        <View style={styles.uiSpacer} />
        <UIButton
          onPress={() =>
            navigation.navigate(SCREEN_LITTEN_POST, { preview: true })
          }
          fluid>
          {translate('screens.new.preview')}
        </UIButton>
        <View style={styles.uiSpacer} />
        <UIButton fluid secondary>
          {translate('screens.new.post')}
        </UIButton>
        <View style={styles.uiSpacer} />
        <UIButton fluid danger onPress={clearForm}>
          {translate('screens.new.clear')}
        </UIButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  formContainer: {
    marginTop: 18,
  },
  uiSpacer: {
    height: 20,
  },
})

export default NewForm
