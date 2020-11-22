/**
 * @format
 * @flow
 */

import parsePhoneNumber, { AsYouType } from 'libphonenumber-js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AuthenticatedUserActions } from 'store/actions/authenticated-user'
import {
  FORM_PROFILE_SET_LOCATION,
  FormProfileActions,
} from 'store/actions/form-profile'
import { useEffect, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert, Pressable, Keyboard, StyleSheet, View } from 'react-native'
import {
  displayNameValidator,
  emailValidator,
  phoneNumberValidator,
  resetValidator,
} from 'utils/validators'
import User from 'model/user'
import {
  UIButton,
  UIInput,
  UIListItem,
  UILoader,
  UISeparator,
  UISwitch,
  UIText,
} from 'ui-elements'
import AddPhoto from 'components/add-photo'
import SelectPhoto from 'components/select-photo'
import { clearStorage } from 'store/utils'
import { getErrorMessage, stringifyLocation } from 'utils/functions'
import { logError } from 'utils/dev'
import {
  SCREEN_NEW_LOCATION,
  USER_AVATAR_SIZE_LARGE,
  USER_PREFERENCES_CONTACT_CALL,
  USER_PREFERENCES_CONTACT_SMS,
} from 'utils/constants'
import { translate } from 'utils/i18n'
import type { Dispatch, State } from 'store/types/state'
import type { AuthenticatedUser, ProfileForm } from 'store/types'

type OwnProps = {||}
type StateProps = {|
  +authenticatedUser: AuthenticatedUser,
  +formProfile: ProfileForm,
|}
type AutheUserActions = typeof AuthenticatedUserActions
type ProfileActions = typeof FormProfileActions
type DispatchProps = {|
  ...AutheUserActions,
  ...ProfileActions,
|}
type EditProps = {|
  ...OwnProps,
  ...StateProps,
  ...DispatchProps,
|}

const mapStateToProps = (state: State): StateProps => ({
  authenticatedUser: state.authenticatedUser,
  formProfile: state.formProfile,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    { ...AuthenticatedUserActions, ...FormProfileActions },
    dispatch,
  )

const ProfileEditScreen: (args: any) => React$Node = ({
  authenticatedUser: { extra },
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
  const [displayNameValidation, setDisplayNameValidation] = useState(
    resetValidator,
  )
  const [emailValidation, setEmailValidation] = useState(resetValidator)
  const [phoneNumberValidation, setPhoneNumberValidation] = useState(
    resetValidator,
  )
  const [isLoading, setIsLoading] = useState(false)

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

  const handleOnPhotoChange = (image) => {
    if (image) {
      setProfilePhotoURL(image.path)
    } else {
      setProfilePhotoURL('')
    }
  }

  const handleChangePhoneNumber = (newPhoneNumber) => {
    const parsedPhoneNumber = parsePhoneNumber(newPhoneNumber)
    const formattedPhoneNumber =
      parsedPhoneNumber?.format('E.164') ?? newPhoneNumber
    const international =
      formattedPhoneNumber.length > 0 && !formattedPhoneNumber.startsWith('+')
        ? `+${formattedPhoneNumber}`
        : formattedPhoneNumber
    setProfilePhoneNumber(international)
  }

  const handleSetPhotoURL = (newPhotoURL) => {
    if (newPhotoURL !== photoURL) {
      user.photoURL = newPhotoURL
    }
  }

  const handleSetDisplayName = (newDisplayName) => {
    if (newDisplayName !== displayName) {
      user.displayName = newDisplayName
    }
  }

  const handleSetEmail = (newEmail) => {
    if (newEmail !== email) {
      askForPassword({
        text: translate('cta.change'),
        onPress: async (password) => {
          await user.reauthenticate(password)
          user.email = newEmail
        },
      })
    }
  }

  const handleSetPhoneNumber = (newPhoneNumber) => {
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
  }

  const handleSetLocation = (newLocation) => {
    if (newLocation !== location) {
      user.location = newLocation
    }
  }

  const handleSetIsOrganization = (newIsOrganization) => {
    if (newIsOrganization !== isOrganization) {
      user.isOrganization = newIsOrganization
    }
  }

  const refreshUser = async () => {
    await user.get()
    setExtra(user.toJSON())
    clearProfileForm()
  }

  const updateUser = async () => {
    setIsLoading(true)
    handleSetEmail(editedEmail ?? email)
    handleSetDisplayName(editedDisplayName ?? displayName)
    handleSetIsOrganization(editedIsOrganization ?? isOrganization)
    handleSetLocation(editedLocation ?? location)
    handleSetPhoneNumber(editedPhoneNumber ?? phoneNumber)
    handleSetPhotoURL(editedPhotoURL ?? photoURL)
    await refreshUser()
    setIsLoading(false)
  }

  const validateChanges = () => {
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
  }

  const saveChanges = () => {
    const editable = [
      editedDisplayName,
      editedEmail,
      editedIsOrganization,
      editedLocation,
      editedPhoneNumber,
      editedPhotoURL,
    ]
    const hasChanges = editable.some((v) => v !== null)
    if (hasChanges) {
      const changesAreValid = validateChanges()
      if (changesAreValid) {
        updateUser()
      }
    }
  }

  const deleteAccount = async (password) => {
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
  }

  const askForPassword = (actionAfter) => {
    Alert.prompt(
      translate('cta.enterPassword'),
      translate('feedback.confirmMessages.enterPassword'),
      [
        {
          text: translate('cta.cancel'),
          onPress: () => null,
          style: 'cancel',
        },
        actionAfter,
      ],
      'secure-text',
    )
  }

  const deleteConfirm = () => {
    Alert.alert(
      translate('cta.deleteProfile'),
      translate('feedback.confirmMessages.deleteProfile'),
      [
        {
          text: translate('cta.yes'),
          onPress: () =>
            askForPassword({
              text: translate('cta.delete'),
              onPress: deleteAccount,
              style: 'destructive',
            }),
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

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.editContainer}>
      <UILoader active={isLoading} transparent />
      <View style={styles.editPhoto}>
        <AddPhoto
          imageSource={editedPhotoURL ?? photoURL}
          ImageComponent={SelectPhoto}
          PlaceholderComponent={SelectPhoto}
          onChange={handleOnPhotoChange}
        />
      </View>
      <UISeparator invisible />
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
            dispatchToAction: FORM_PROFILE_SET_LOCATION,
          })
        }
        hasExtra>
        {stringifyLocation(editedLocation ?? location) ||
          translate('forms.location')}
      </UIListItem>
      <UISwitch
        value={editedIsOrganization ?? isOrganization}
        onValueChange={setProfileIsOrganization}>
        {translate('screens.edit.isOrganization')}
      </UISwitch>
      <UIText>{translate('screens.edit.isOrganizationDesc')}</UIText>
      <UISeparator invisible />
      <UIButton
        onPress={saveChanges}
        disabled={isLoading}
        secondary
        style={styles.editButton}>
        {translate('cta.save')}
      </UIButton>
      <UISeparator invisible small />
      <UIButton onPress={deleteConfirm} danger style={styles.editButton}>
        {translate('screens.edit.delete')}
      </UIButton>
    </Pressable>
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

export default connect<
  EditProps,
  OwnProps,
  StateProps,
  DispatchProps,
  State,
  Dispatch,
>(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileEditScreen)
