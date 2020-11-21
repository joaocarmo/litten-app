/**
 * @format
 * @flow
 */

import { useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { Alert, StyleSheet, View } from 'react-native'
import { FORM_NEW_SET_LOCATION } from 'store/actions/form-new'
import {
  UIButton,
  UIImagePlaceholder,
  UIInput,
  UIListItem,
  UISeparator,
  UISwitch,
  UIText,
  UITextArea,
} from 'ui-elements'
import Litten from 'model/litten'
import Search from 'model/search'
import AddPhoto from 'components/add-photo'
import {
  littenLocationValidator,
  littenPhotoValidator,
  littenSpeciesValidator,
  littenStoryValidator,
  littenTitleValidator,
  littenTypeValidator,
} from 'utils/validators'
import {
  getFromListByKey,
  iterateTimes,
  logError,
  stringifyLocation,
} from 'utils/functions'
import { translate } from 'utils/i18n'
import {
  NEW_POST_NUM_OF_PHOTOS,
  SCREEN_LITTEN_POST,
  SCREEN_NEW_LOCATION,
} from 'utils/constants'
import { littenSpeciesList, littenTypes } from 'utils/litten'

const NewForm: (args: any) => React$Node = ({
  addPhoto,
  clearNewForm,
  formNew: litten,
  removePhoto,
  setActivePosts,
  setLocation,
  setSpecies,
  setStory,
  setTitle,
  setType,
  setUseExtraInfo,
  updatePhoto,
  user,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { photos, story, title, species, type, location, useExtraInfo } = litten

  const navigation = useNavigation()
  const { showActionSheetWithOptions } = useActionSheet()

  const search = useRef(new Search({ user })).current

  const handleOnPhotoChange = (image, index = null) => {
    if (image) {
      if (index === null) {
        addPhoto({ uri: image.path })
      } else {
        updatePhoto({ uri: image.path }, index)
      }
    } else {
      removePhoto(index)
    }
  }

  const chooseSpecies = () => {
    const options = [
      translate('cta.cancel'),
      ...littenSpeciesList.map(({ label }) => label),
    ]

    showActionSheetWithOptions(
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

    showActionSheetWithOptions(
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

  const clearForm = (confirm = false) => {
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

  const validateForm = () => {
    const validators = [
      littenPhotoValidator(photos),
      littenTitleValidator(title),
      littenSpeciesValidator(species),
      littenTypeValidator(type),
      littenStoryValidator(story),
      littenLocationValidator(location),
    ]
    for (const validator of validators) {
      const { error, errorMessage } = validator
      if (error) {
        Alert.alert(errorMessage)
        return false
      }
    }
    return true
  }

  const updatePosts = async () => {
    const userActivePosts = await search.userActivePosts()
    setActivePosts(userActivePosts)
  }

  const submitForm = async () => {
    const isFormValid = validateForm()
    if (isFormValid) {
      const newLitten = new Litten({ ...litten, user })

      try {
        setIsSubmitting(true)
        await newLitten.save()
        clearNewForm()
        updatePosts()
        setIsSubmitting(false)
        Alert.alert(translate('screens.new.createSuccess'))
      } catch (err) {
        logError(err)
        setIsSubmitting(false)
      }
    }
  }

  const littenSpecies = getFromListByKey(littenSpeciesList, species)?.label
  const littenType = getFromListByKey(littenTypes, type)?.label

  return (
    <>
      <UIText>{translate('screens.new.addPhotos')}</UIText>
      <UIImagePlaceholder.Group>
        {iterateTimes(NEW_POST_NUM_OF_PHOTOS).map((v, idx) => (
          <AddPhoto
            key={idx}
            imageSource={photos[idx]}
            actionable={idx === photos.length}
            ImageComponent={UIImagePlaceholder.ImageItem}
            PlaceholderComponent={UIImagePlaceholder.Item}
            onChange={(image) => handleOnPhotoChange(image, idx)}
          />
        ))}
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
          onPress={() =>
            navigation.navigate(SCREEN_NEW_LOCATION, {
              dispatchToAction: FORM_NEW_SET_LOCATION,
            })
          }
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
            navigation.navigate(SCREEN_LITTEN_POST, {
              preview: true,
              litten,
              user,
            })
          }
          disabled={isSubmitting}
          fluid>
          {translate('screens.new.preview')}
        </UIButton>
        <View style={styles.uiSpacer} />
        <UIButton onPress={submitForm} disabled={isSubmitting} fluid secondary>
          {translate('screens.new.post')}
        </UIButton>
        <View style={styles.uiSpacer} />
        <UIButton onPress={clearForm} disabled={isSubmitting} fluid danger>
          {translate('screens.new.clear')}
        </UIButton>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 18,
  },
  uiSpacer: {
    height: 20,
  },
})

export default NewForm
