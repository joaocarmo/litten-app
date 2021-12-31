import parsePhoneNumber, { AsYouType } from 'libphonenumber-js'
import { useCallback, useEffect, useMemo, useState, useRef } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Alert, Pressable, Keyboard, StyleSheet, View } from 'react-native'
import { useDebouncedCallback, useEmailVerified } from 'hooks'
import {
  displayNameValidator,
  emailValidator,
  phoneNumberValidator,
  resetValidator,
} from 'utils/validators'
import Auth from 'model/auth'
import User from 'model/user'
import {
  UIBalloon,
  UIButton,
  UIInput,
  UIListItem,
  UILoader,
  UIPrompt,
  UISeparator,
  UISwitch,
  UIText,
} from 'ui-elements'
import AddPhoto from 'components/add-photo'
import SelectPhoto from 'components/select-photo'
import { clearStorage } from 'store/utils'
import {
  getErrorMessage,
  getImagePath,
  stringifyLocation,
} from 'utils/functions'
import { logError } from 'utils/dev'
import {
  FORM_PROFILE_SET_LOCATION,
  SCREEN_NEW_LOCATION,
  USER_AVATAR_SIZE_LARGE,
  USER_PREFERENCES_CONTACT_CALL,
  USER_PREFERENCES_CONTACT_SMS,
} from 'utils/constants'
import { translate } from 'utils/i18n'

const FormProfile = ({
  authenticatedUser: { basic, extra },
  formProfile: {
    displayName: editedDisplayName,
    email: editedEmail,
    isOrganization: editedIsOrganization,
    location: editedLocation,
    phoneNumber: editedPhoneNumber,
    photoURL: editedPhotoURL,
  },
  clearProfileForm,
  setExtra,
  setLocation,
  setProfileDisplayName,
  setProfileEmail,
  setProfileIsOrganization,
  setProfileLocation,
  setProfilePhoneNumber,
  setProfilePhotoURL,
}) => {
  const [displayNameValidation, setDisplayNameValidation] =
    useState(resetValidator)
  const [emailValidation, setEmailValidation] = useState(resetValidator)
  const [phoneNumberValidation, setPhoneNumberValidation] =
    useState(resetValidator)
  const [emailVerificationSent, setEmailVerificationSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [changePromptIsOpen, setChangePromptIsOpen] = useState(false)
  const [deletePromptIsOpen, setDeletePromptIsOpen] = useState(false)

  const closePrompt = () => {
    setChangePromptIsOpen(false)
    setDeletePromptIsOpen(false)
  }

  const emailVerified = useEmailVerified()
  const user = useRef(new User(extra)).current
  const {
    displayName,
    email,
    isOrganization,
    location,
    phoneNumber,
    photoURL,
  } = extra
  const navigation = useNavigation()
  useEffect(() => {
    return () => clearProfileForm()
  }, [clearProfileForm])
  const [debouncedSetIsLoading, cancelSetIsLoading] = useDebouncedCallback(
    useCallback((value) => {
      setIsLoading(value)
    }, []),
  )
  const handleOnPhotoChange = useCallback(
    (image) => {
      if (image) {
        const imagePath = getImagePath(image)
        setProfilePhotoURL(imagePath)
      } else {
        setProfilePhotoURL('')
      }
    },
    [setProfilePhotoURL],
  )
  const handleChangePhoneNumber = useCallback(
    (newPhoneNumber) => {
      const parsedPhoneNumber = parsePhoneNumber(newPhoneNumber)
      const formattedPhoneNumber =
        parsedPhoneNumber?.format('E.164') ?? newPhoneNumber
      const international =
        formattedPhoneNumber.length > 0 && !formattedPhoneNumber.startsWith('+')
          ? `+${formattedPhoneNumber}`
          : formattedPhoneNumber
      setProfilePhoneNumber(international)
    },
    [setProfilePhoneNumber],
  )
  const handleSetPhotoURL = useCallback(
    (newPhotoURL) => {
      if (newPhotoURL !== photoURL) {
        user.photoURL = newPhotoURL
      }
    },
    [photoURL, user],
  )
  const handleSetDisplayName = useCallback(
    (newDisplayName) => {
      if (newDisplayName !== displayName) {
        user.displayName = newDisplayName
      }
    },
    [displayName, user],
  )
  const handleSetEmail = useCallback(
    (newEmail) => {
      if (newEmail !== email) {
        user.email = editedEmail
      }
    },
    [editedEmail, email, user],
  )
  const handleSetPhoneNumber = useCallback(
    (newPhoneNumber) => {
      if (newPhoneNumber !== phoneNumber) {
        if (newPhoneNumber) {
          user.phoneNumber = newPhoneNumber
        } else if (!newPhoneNumber) {
          user.phoneNumber = ''

          // Clear these preferences if the phone number is cleared
          if (user.contactPreferences.includes(USER_PREFERENCES_CONTACT_CALL)) {
            user.contactPreferences = USER_PREFERENCES_CONTACT_CALL
          }

          if (user.contactPreferences.includes(USER_PREFERENCES_CONTACT_SMS)) {
            user.contactPreferences = USER_PREFERENCES_CONTACT_SMS
          }
        }
      }
    },
    [phoneNumber, user],
  )
  const handleSetLocation = useCallback(
    (newLocation) => {
      if (newLocation !== location) {
        user.location = newLocation
      }
    },
    [location, user],
  )
  const handleSetIsOrganization = useCallback(
    (newIsOrganization) => {
      if (newIsOrganization !== isOrganization) {
        user.isOrganization = newIsOrganization
      }
    },
    [isOrganization, user],
  )
  const refreshUser = useCallback(async () => {
    await user.get()
    setExtra(user.toJSON())
    clearProfileForm()
  }, [clearProfileForm, setExtra, user])
  const updateUser = useCallback(async () => {
    setIsLoading(true)
    user.deferredSave = true
    handleSetEmail(editedEmail ?? email)
    handleSetDisplayName(editedDisplayName ?? displayName)
    handleSetIsOrganization(editedIsOrganization ?? isOrganization)
    handleSetLocation(editedLocation ?? location)
    handleSetPhoneNumber(editedPhoneNumber ?? phoneNumber)
    handleSetPhotoURL(editedPhotoURL ?? photoURL)
    debouncedSetIsLoading(false)

    try {
      await user.save()
      await refreshUser()
    } catch (err) {
      logError(err)
    } finally {
      cancelSetIsLoading()
      setIsLoading(false)
    }
  }, [
    cancelSetIsLoading,
    debouncedSetIsLoading,
    displayName,
    editedDisplayName,
    editedEmail,
    editedIsOrganization,
    editedLocation,
    editedPhoneNumber,
    editedPhotoURL,
    email,
    handleSetDisplayName,
    handleSetEmail,
    handleSetIsOrganization,
    handleSetLocation,
    handleSetPhoneNumber,
    handleSetPhotoURL,
    isOrganization,
    location,
    phoneNumber,
    photoURL,
    refreshUser,
    user,
  ])
  const validateChanges = useCallback(() => {
    let displayNameValidated = { ...displayNameValidation }
    let emailValidated = { ...emailValidation }
    let phoneNumberValidated = { ...phoneNumberValidation }

    if (editedDisplayName !== null) {
      displayNameValidated = displayNameValidator(editedDisplayName)
      setDisplayNameValidation(displayNameValidated)
    }

    if (editedEmail !== null) {
      emailValidated = emailValidator(editedEmail)
      setEmailValidation(emailValidated)
    }

    if (editedPhoneNumber !== null) {
      const asYouType = new AsYouType(location.country)
      asYouType.input(editedPhoneNumber)
      const phoneNumberExtracted = asYouType.getNumber()

      if (phoneNumberExtracted || editedPhoneNumber) {
        phoneNumberValidated = phoneNumberValidator(
          phoneNumberExtracted?.number,
          phoneNumberExtracted?.country,
          phoneNumberExtracted?.countryCallingCode,
        )
      } else {
        phoneNumberValidated = resetValidator
      }

      setPhoneNumberValidation(phoneNumberValidated)
    }

    return [displayNameValidated, emailValidated, phoneNumberValidated].every(
      ({ error }) => !error,
    )
  }, [
    displayNameValidation,
    editedDisplayName,
    editedEmail,
    editedPhoneNumber,
    emailValidation,
    location.country,
    phoneNumberValidation,
  ])
  const saveChanges = useCallback(() => {
    const editable = [
      editedDisplayName,
      editedEmail,
      editedIsOrganization,
      editedLocation,
      editedPhoneNumber,
      editedPhotoURL,
    ]
    const editableWithPassword = [editedEmail]
    const hasChanges = editable.some((v) => v !== null)

    if (hasChanges) {
      const changesAreValid = validateChanges()
      const requiresPassword = editableWithPassword.some((v) => v !== null)

      if (changesAreValid) {
        if (requiresPassword && !changePromptIsOpen) {
          setChangePromptIsOpen(true)
        } else {
          updateUser()
        }
      }
    }
  }, [
    changePromptIsOpen,
    editedDisplayName,
    editedEmail,
    editedIsOrganization,
    editedLocation,
    editedPhoneNumber,
    editedPhotoURL,
    updateUser,
    validateChanges,
  ])
  const handleUpdateWithPassword = useCallback(
    async (password) => {
      closePrompt()

      if (password) {
        try {
          await user.reauthenticate(password)
          updateUser()
        } catch (err) {
          const fbErrorMessage = getErrorMessage('firebase', err.code)
          Alert.alert(fbErrorMessage)
        }
      }
    },
    [updateUser, user],
  )
  const deleteAccount = useCallback(
    async (password) => {
      closePrompt()

      if (password) {
        setIsLoading(true)

        try {
          await user.reauthenticate(password)
          await user.delete()
          await clearStorage()
        } catch (err) {
          logError(err)
          const fbErrorMessage = getErrorMessage('firebase', err.code)
          Alert.alert(fbErrorMessage)
          setIsLoading(false)
        }
      }
    },
    [user],
  )
  const deleteConfirm = useCallback(() => {
    Alert.alert(
      translate('cta.deleteProfile'),
      translate('feedback.confirmMessages.deleteProfile'),
      [
        {
          text: translate('cta.yes'),
          onPress: () => !deletePromptIsOpen && setDeletePromptIsOpen(true),
          style: 'destructive',
        },
        {
          text: translate('cta.no'),
          onPress: () => null,
        },
      ],
    )
  }, [deletePromptIsOpen])
  const sendConfirmationEmail = useCallback(async () => {
    setIsLoading(true)

    try {
      const auth = new Auth(basic)
      await auth.sendEmailVerification()
      setEmailVerificationSent(true)
    } catch (err) {
      logError(err)
    } finally {
      setIsLoading(false)
    }
  }, [basic])
  const handleSendConfirmationEmail = useCallback(() => {
    if (!emailVerificationSent) {
      Alert.alert(
        translate('cta.confirmationEmail'),
        translate('feedback.confirmMessages.confirmationEmail'),
        [
          {
            text: translate('cta.yes'),
            onPress: sendConfirmationEmail,
          },
          {
            text: translate('cta.no'),
            onPress: () => null,
          },
        ],
      )
    }
  }, [emailVerificationSent, sendConfirmationEmail])
  const renderConfirmChange = useMemo(
    () => (
      <UIPrompt
        open={changePromptIsOpen}
        title={translate('cta.enterPassword')}
        message={translate('feedback.confirmMessages.enterPassword')}
        type="secure-text"
        cancelLabel={translate('cta.cancel')}
        onCancel={closePrompt}
        confirmLabel={translate('cta.change')}
        onConfirm={handleUpdateWithPassword}
      />
    ),
    [changePromptIsOpen, handleUpdateWithPassword],
  )
  const renderConfirmDelete = useMemo(
    () => (
      <UIPrompt
        open={deletePromptIsOpen}
        title={translate('cta.enterPassword')}
        message={translate('feedback.confirmMessages.enterPassword')}
        type="secure-text"
        cancelLabel={translate('cta.cancel')}
        onCancel={closePrompt}
        confirmLabel={translate('cta.delete')}
        onConfirm={deleteAccount}
        isDestructive
      />
    ),
    [deleteAccount, deletePromptIsOpen],
  )
  return (
    <>
      <UILoader active={isLoading} transparent />
      {renderConfirmChange}
      {renderConfirmDelete}
      <Pressable onPress={Keyboard.dismiss} style={styles.editContainer}>
        <View style={styles.editPhoto}>
          <AddPhoto
            imageSource={editedPhotoURL ?? photoURL}
            ImageComponent={SelectPhoto}
            PlaceholderComponent={SelectPhoto}
            onChange={handleOnPhotoChange}
          />
        </View>
        <UIInput
          placeholder={translate('forms.name')}
          value={editedDisplayName ?? displayName}
          onChangeText={setProfileDisplayName}
          autoCompleteType="name"
          error={displayNameValidation.error}
          errorMessage={displayNameValidation.errorMessage}
        />
        {!displayNameValidation.error && (
          <UIText noPadding>{translate('forms.name')}</UIText>
        )}
        <UIInput
          placeholder={translate('forms.email')}
          value={editedEmail ?? email}
          onChangeText={setProfileEmail}
          autoCompleteType="email"
          keyboardType="email-address"
          error={emailValidation.error}
          errorMessage={emailValidation.errorMessage}
        />
        {!emailValidation.error && (
          <UIText noPadding>{translate('forms.email')}</UIText>
        )}
        {!emailVerified && (
          <>
            <UISeparator invisible small />
            <UIBalloon
              onPress={handleSendConfirmationEmail}
              type={emailVerificationSent ? 'info' : 'error'}
            >
              {emailVerificationSent
                ? translate('feedback.errorMessages.profileUnverifiefEmailSent')
                : translate('feedback.errorMessages.profileUnverifiefEmail')}
            </UIBalloon>
          </>
        )}
        <UIInput
          placeholder={translate('forms.phoneNumber')}
          value={new AsYouType(location.country).input(
            editedPhoneNumber ?? phoneNumber,
          )}
          onChangeText={handleChangePhoneNumber}
          autoCompleteType="tel"
          keyboardType="phone-pad"
          error={phoneNumberValidation.error}
          errorMessage={phoneNumberValidation.errorMessage}
        />
        {!phoneNumberValidation.error && (
          <UIText noPadding>{translate('forms.phoneNumber')}</UIText>
        )}
        <UISeparator invisible />
        <UIListItem
          onPress={() =>
            navigation.navigate(SCREEN_NEW_LOCATION, {
              initialCoordinates: location?.coordinates,
              dispatchToAction: FORM_PROFILE_SET_LOCATION,
            })
          }
          hasExtra
        >
          {stringifyLocation(editedLocation ?? location) ||
            translate('forms.location')}
        </UIListItem>
        <UISwitch
          description={translate('screens.edit.isOrganizationDesc')}
          label={translate('screens.edit.isOrganization')}
          value={editedIsOrganization ?? isOrganization}
          onValueChange={setProfileIsOrganization}
        />
        <UISeparator invisible />
        <UIButton
          onPress={saveChanges}
          disabled={isLoading}
          secondary
          style={styles.editButton}
        >
          {translate('cta.save')}
        </UIButton>
        <UISeparator invisible small />
        <UIButton onPress={deleteConfirm} danger style={styles.editButton}>
          {translate('screens.edit.delete')}
        </UIButton>
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  editContainer: {
    flex: 1,
  },
  editPhoto: {
    height: USER_AVATAR_SIZE_LARGE,
    width: USER_AVATAR_SIZE_LARGE,
    alignSelf: 'center',
  },
  editButton: {
    alignSelf: 'center',
  },
})
export default FormProfile
