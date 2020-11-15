/**
 * @format
 * @flow
 */

import { useRef } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthenticatedUser from 'store/actions/authenticated-user'
import { useState } from 'react'
import { Alert, Pressable, Keyboard, StyleSheet, View } from 'react-native'
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
import { clearStorage } from 'store'
import { getErrorMessage, logError, stringifyLocation } from 'utils/functions'
import { validPhoneNumber } from 'utils/validators'
import {
  USER_AVATAR_SIZE_LARGE,
  USER_PREFERENCES_CONTACT_CALL,
  USER_PREFERENCES_CONTACT_SMS,
} from 'utils/constants'
import { translate } from 'utils/i18n'

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticatedUser,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(AuthenticatedUser, dispatch)

const ProfileEditScreen: (args: any) => React$Node = ({
  authenticatedUser: { basic, extra },
  setContactPreferences,
  setDisplayName,
  setEmail,
  setIsOrganization,
  setLocation,
  setPhoneNumber,
  setPhotoURL,
}) => {
  const [editedDisplayName, setEditedDisplayName] = useState(null)
  const [editedEmail, setEditedEmail] = useState(null)
  const [editedIsOrganization, setEditedIsOrganization] = useState(null)
  const [editedLocation, setEditedLocation] = useState(null)
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(null)
  const [editedPhotoURL, setEditedPhotoURL] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const user = useRef(new User({ ...basic, ...extra })).current

  const {
    displayName,
    email,
    isOrganization,
    location,
    phoneNumber,
    photoURL,
  } = extra

  const handleOnPhotoChange = (image) => {
    if (image) {
      setEditedPhotoURL(image.path)
    } else {
      setEditedPhotoURL('')
    }
  }

  const handleSetPhotoURL = (newPhotoURL) => {
    if (newPhotoURL !== photoURL) {
      user.photoURL = newPhotoURL
      setPhotoURL(newPhotoURL)
    }
  }

  const handleSetDisplayName = (newDisplayName) => {
    if (newDisplayName !== displayName) {
      user.displayName = newDisplayName
      setDisplayName(newDisplayName)
    }
  }

  const handleSetEmail = (newEmail) => {
    if (newEmail !== email) {
      askForPassword({
        text: translate('cta.change'),
        onPress: async (password) => {
          await user.reauthenticate(password)
          user.email = newEmail
          setEmail(newEmail)
        },
      })
    }
  }

  const handleSetPhoneNumber = (newPhoneNumber) => {
    if (newPhoneNumber !== phoneNumber) {
      const callingCode = '+351'
      if (validPhoneNumber('PT', callingCode)(newPhoneNumber)) {
        user.phoneNumber = `${callingCode}${newPhoneNumber}`
      } else if (!newPhoneNumber) {
        user.phoneNumber = ''
        // Clear these preferences if the phone number is cleared
        if (user.contactPreferences.includes(USER_PREFERENCES_CONTACT_CALL)) {
          setContactPreferences(USER_PREFERENCES_CONTACT_CALL)
          user.contactPreferences = USER_PREFERENCES_CONTACT_CALL
        }
        if (user.contactPreferences.includes(USER_PREFERENCES_CONTACT_SMS)) {
          setContactPreferences(USER_PREFERENCES_CONTACT_SMS)
          user.contactPreferences = USER_PREFERENCES_CONTACT_SMS
        }
      }
      setPhoneNumber(newPhoneNumber)
    }
  }

  const handleSetLocation = (newLocation) => {
    if (newLocation !== location) {
      user.location = newLocation
      setLocation(newLocation)
    }
  }

  const handleSetIsOrganization = (newIsOrganization) => {
    if (newIsOrganization !== isOrganization) {
      user.isOrganization = newIsOrganization
      setIsOrganization(newIsOrganization)
    }
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
    const hasChanges = editable.some((v) => v === null)
    if (hasChanges) {
      handleSetPhotoURL(editedPhotoURL ?? photoURL)
      handleSetDisplayName(editedDisplayName ?? displayName)
      handleSetEmail(editedEmail ?? email)
      handleSetPhoneNumber(editedPhoneNumber ?? phoneNumber)
      handleSetLocation(editedLocation ?? location)
      handleSetIsOrganization(editedIsOrganization ?? isOrganization)
      setIsSaved(true)
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
        onChangeText={setEditedDisplayName}
      />
      <UIText noPadding>{translate('forms.name')}</UIText>
      <UIInput
        placeholder={translate('forms.email')}
        value={editedEmail ?? email}
        onChangeText={setEditedEmail}
      />
      <UIText noPadding>{translate('forms.email')}</UIText>
      <UIInput
        placeholder={translate('forms.phoneNumber')}
        value={editedPhoneNumber ?? phoneNumber}
        onChangeText={setEditedPhoneNumber}
      />
      <UIText noPadding>{translate('forms.phoneNumber')}</UIText>
      <UISeparator invisible />
      <UIListItem onPress={() => setEditedLocation(null)} hasExtra>
        {stringifyLocation(editedLocation ?? location) ||
          translate('forms.location')}
      </UIListItem>
      <UISwitch
        value={editedIsOrganization ?? isOrganization}
        onValueChange={setEditedIsOrganization}>
        {translate('screens.edit.isOrganization')}
      </UISwitch>
      <UIText>{translate('screens.edit.isOrganizationDesc')}</UIText>
      <UISeparator invisible />
      <UIButton
        onPress={saveChanges}
        disabled={isSaved}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditScreen)
