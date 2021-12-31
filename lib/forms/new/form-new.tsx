import { APP_IS_DEV } from 'utils/env'
import Toast from 'react-native-simple-toast'
import { useCallback, useMemo, useRef, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { Alert } from 'react-native'
import {
  UIBalloon,
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
import { useDebouncedCallback, useEmailVerified } from 'hooks'
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
  getImagePath,
  iterateTimes,
  stringifyLocation,
} from 'utils/functions'
import { logError } from 'utils/dev'
import { translate } from 'utils/i18n'
import {
  FORM_NEW_SET_LOCATION,
  NEW_POST_NUM_OF_PHOTOS,
  SCREEN_LITTEN_POST,
  SCREEN_NEW_LOCATION,
  SCREEN_PROFILE_EDIT,
  SCREEN_TAB_NAV_PROFILE,
} from 'utils/constants'
import { littenSpeciesList, littenTypes } from 'utils/litten'

const NewForm = ({
  addPhoto,
  clearNewForm,
  formNew: litten,
  removePhoto,
  setActivePosts,
  setLocation,
  setSpecies,
  setStory,
  // setTags,
  setTitle,
  setType,
  setUseExtraInfo,
  updatePhoto,
  user,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    location,
    photos,
    species,
    story,
    // tags,
    title,
    type,
    useExtraInfo,
  } = litten
  const { location: userLocation } = user
  const isAllowedToCreate = useEmailVerified()
  const navigation = useNavigation()
  const { showActionSheetWithOptions } = useActionSheet()
  const search = useRef(
    new Search({
      user,
    }),
  ).current
  const [debouncedSetIsSubmitting, cancelSetIsSubmitting] =
    useDebouncedCallback(
      useCallback(
        (value) => {
          clearNewForm()
          setIsSubmitting(value)
        },
        [clearNewForm],
      ),
    )
  const handleOnPhotoChange = useCallback(
    (image, photoIndex = null) => {
      if (image) {
        const imagePath = getImagePath(image)

        if (photoIndex === null) {
          addPhoto({
            photo: {
              uri: imagePath,
            },
          })
        } else {
          updatePhoto({
            photo: {
              uri: imagePath,
            },
            photoIndex,
          })
        }
      } else {
        removePhoto({
          photoIndex,
        })
      }
    },
    [addPhoto, removePhoto, updatePhoto],
  )
  const chooseSpecies = useCallback(() => {
    const options = [
      ...littenSpeciesList.map(({ label }) => label),
      translate('cta.cancel'),
    ]
    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex: null,
        cancelButtonIndex: options.length - 1,
      },
      (buttonIndex) => {
        if (Number.isInteger(buttonIndex)) {
          setSpecies(littenSpeciesList[buttonIndex]?.key)
        }
      },
    )
  }, [setSpecies, showActionSheetWithOptions])
  const chooseType = useCallback(() => {
    const options = [
      ...littenTypes.map(({ label }) => label),
      translate('cta.cancel'),
    ]
    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex: null,
        cancelButtonIndex: options.length - 1,
      },
      (buttonIndex) => {
        if (Number.isInteger(buttonIndex)) {
          setType(littenTypes[buttonIndex]?.key)
        }
      },
    )
  }, [setType, showActionSheetWithOptions])
  const selectLocation = useCallback(() => {
    const options = [
      translate('screens.new.selectLocationMap'),
      translate('screens.new.selectLocationProfile'),
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
          navigation.navigate(SCREEN_NEW_LOCATION, {
            initialCoordinates: location?.coordinates,
            dispatchToAction: FORM_NEW_SET_LOCATION,
          })
        }

        if (buttonIndex === 1) {
          setLocation(userLocation)
        }
      },
    )
  }, [
    location?.coordinates,
    navigation,
    setLocation,
    showActionSheetWithOptions,
    userLocation,
  ])
  const clearForm = useCallback(
    (confirm = false) => {
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
        ],
      )
    },
    [clearNewForm],
  )
  const validateForm = useCallback(() => {
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
        Alert.alert(
          translate('feedback.errorMessages.newErrorTitle'),
          errorMessage,
        )
        return false
      }
    }

    if (!isAllowedToCreate) {
      Alert.alert(
        translate('feedback.errorMessages.newErrorTitle'),
        translate('feedback.errorMessages.newUnverifiefEmail'),
      )
      return false
    }

    return true
  }, [isAllowedToCreate, location, photos, species, story, title, type])
  const updatePosts = useCallback(async () => {
    const userActivePosts = await search.userActivePosts()
    setActivePosts(userActivePosts)
  }, [search, setActivePosts])
  const submitForm = useCallback(async () => {
    const isFormValid = validateForm()

    if (isFormValid) {
      const newLitten = new Litten({ ...litten, user })
      newLitten.tags = newLitten.buildTagsFromAttributes()

      try {
        setIsSubmitting(true)
        debouncedSetIsSubmitting(false)
        await newLitten.save()
        Toast.show(translate('screens.new.createSuccess'))
        clearNewForm()
        updatePosts()
      } catch (err) {
        logError(err)
      } finally {
        cancelSetIsSubmitting()
        setIsSubmitting(false)
      }
    }
  }, [
    cancelSetIsSubmitting,
    clearNewForm,
    debouncedSetIsSubmitting,
    litten,
    updatePosts,
    user,
    validateForm,
  ])
  const goToEditProfile = useCallback(() => {
    navigation.navigate(SCREEN_TAB_NAV_PROFILE, {
      screen: SCREEN_PROFILE_EDIT,
      initial: false,
    })
  }, [navigation])
  const littenSpecies = useMemo(
    () => getFromListByKey(littenSpeciesList, species)?.label,
    [species],
  )
  const littenType = useMemo(
    () => getFromListByKey(littenTypes, type)?.label,
    [type],
  )
  return (
    <>
      <UISeparator invisible small />
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
      <UISeparator invisible small />
      <UIInput
        placeholder={translate('screens.new.addTitle')}
        onChangeText={setTitle}
        value={title}
      />
      <UIListItem onPress={chooseSpecies} hasExtra>
        {littenSpecies || translate('screens.new.addSpecies')}
      </UIListItem>
      <UIListItem onPress={chooseType} hasExtra>
        {littenType || translate('screens.new.addType')}
      </UIListItem>
      <UITextArea
        placeholder={translate('screens.new.addStory')}
        onChangeText={setStory}
      >
        {story}
      </UITextArea>
      <UIListItem onPress={selectLocation} hasExtra>
        {stringifyLocation(location) || translate('screens.new.addLocation')}
      </UIListItem>
      {APP_IS_DEV && (
        <>
          <UISwitch
            label={translate('screens.new.useExtraInfo')}
            onValueChange={setUseExtraInfo}
            value={useExtraInfo}
          />
          {useExtraInfo && (
            <UIText>{translate('easterEggs.placeholder')}</UIText>
          )}
        </>
      )}
      <UISeparator invisible small />
      <UIButton
        onPress={() =>
          navigation.navigate(SCREEN_LITTEN_POST, {
            preview: true,
            litten,
            user,
          })
        }
        disabled={isSubmitting}
        fluid
      >
        {translate('screens.new.preview')}
      </UIButton>
      {isAllowedToCreate && (
        <>
          <UISeparator invisible small />
          <UIButton
            onPress={submitForm}
            disabled={isSubmitting}
            loading={isSubmitting}
            fluid
            secondary
          >
            {translate('screens.new.post')}
          </UIButton>
        </>
      )}
      <UISeparator invisible small />
      <UIButton onPress={clearForm} disabled={isSubmitting} fluid danger>
        {translate('screens.new.clear')}
      </UIButton>
      {!isAllowedToCreate && (
        <>
          <UISeparator invisible small />
          <UIBalloon type="error" onPress={goToEditProfile}>
            {translate('feedback.errorMessages.newUnverifiefEmail')}
          </UIBalloon>
        </>
      )}
    </>
  )
}

export default NewForm
