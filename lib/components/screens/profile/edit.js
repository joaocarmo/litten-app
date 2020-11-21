/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  AUTH_USER_SET_LOCATION,
  AuthenticatedUserActions,
} from 'store/actions/authenticated-user'
import { useEffect, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
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
  SCREEN_NEW_LOCATION,
  USER_AVATAR_SIZE_LARGE,
  USER_PREFERENCES_CONTACT_CALL,
  USER_PREFERENCES_CONTACT_SMS,
} from 'utils/constants'
import { translate } from 'utils/i18n'
import type { Dispatch, State } from 'store/types/state'
import type { AuthenticatedUser } from 'store/types'

type OwnProps = {||}
type StateProps = {|
  +authenticatedUser: AuthenticatedUser,
|}
type AutheUserActions = typeof AuthenticatedUserActions
type DispatchProps = {|
  ...AutheUserActions,
|}
type EditProps = {|
  ...OwnProps,
  ...StateProps,
  ...DispatchProps,
|}

const mapStateToProps = (state: State): StateProps => ({
  authenticatedUser: state.authenticatedUser,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(AuthenticatedUserActions, dispatch)

const ProfileEditScreen: (args: any) => React$Node = ({
  authenticatedUser: { extra },
  setExtra,
  setLocation,
}) => {
  const [editedDisplayName, setEditedDisplayName] = useState(null)
  const [editedEmail, setEditedEmail] = useState(null)
  const [editedIsOrganization, setEditedIsOrganization] = useState(null)
  const [editedLocation, setEditedLocation] = useState(null)
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(null)
  const [editedPhotoURL, setEditedPhotoURL] = useState(null)
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

  const initialLocation = useRef(location)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => setLocation(initialLocation.current), [])

  useEffect(() => {
    setEditedLocation(location)
  }, [location])

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
      const callingCode = '+351'
      if (validPhoneNumber('PT', callingCode)(newPhoneNumber)) {
        user.phoneNumber = `${callingCode}${newPhoneNumber}`
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

  const handleSetLocation = (newLoc) => {
    if (newLoc !== initialLocation.current) {
      user.location = newLoc
      initialLocation.current = newLoc
    }
  }

  const handleSetIsOrganization = (newIsOrganization) => {
    if (newIsOrganization !== isOrganization) {
      user.isOrganization = newIsOrganization
    }
  }

  const clearForm = () => {
    setEditedDisplayName(null)
    setEditedEmail(null)
    setEditedIsOrganization(null)
    setEditedLocation(null)
    setEditedPhoneNumber(null)
    setEditedPhotoURL(null)
  }

  const refreshUser = async () => {
    await user.get()
    setExtra(user.toJSON())
    clearForm()
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
      updateUser()
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
      <UIListItem
        onPress={() =>
          navigation.navigate(SCREEN_NEW_LOCATION, {
            dispatchToAction: AUTH_USER_SET_LOCATION,
          })
        }
        hasExtra>
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
