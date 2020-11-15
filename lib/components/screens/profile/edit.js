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
  setPhoneNumber,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const user = useRef(new User({ ...basic, ...extra })).current

  const {
    displayName,
    email,
    isOrganization,
    location,
    phoneNumber,
    photoURL,
  } = extra

  const handleSetPhotoURL = () => undefined

  const handleSetDisplayName = (newDisplayName) => {
    setDisplayName(newDisplayName)
    user.displayName = newDisplayName
  }

  const handleSetEmail = (newEmail) => {
    setEmail(newEmail)
    user.email = newEmail
  }

  const handleSetPhoneNumber = (newPhoneNumber) => {
    const callingCode = '+351'
    setPhoneNumber(newPhoneNumber)
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
  }

  const handleSetIsOrganization = () => {
    const newState = !isOrganization
    setIsOrganization(newState)
    user.isOrganization = newState
  }

  const handleSetLocation = () => undefined

  const deleteAccount = async (password) => {
    if (password) {
      setIsLoading(true)
      try {
        await user.delete({ password })
        await clearStorage()
      } catch (err) {
        logError(err)
        const fbErrorMessage = getErrorMessage('firebase', err.code)
        Alert.alert(fbErrorMessage)
        setIsLoading(false)
      }
    }
  }

  const askForPassword = () => {
    Alert.prompt(
      translate('cta.enterPassword'),
      translate('feedback.confirmMessages.enterPassword'),
      [
        {
          text: translate('cta.cancel'),
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: translate('cta.delete'),
          onPress: deleteAccount,
          style: 'destructive',
        },
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
          onPress: () => askForPassword(),
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
        <SelectPhoto photoURL={photoURL} onChange={handleSetPhotoURL} />
      </View>
      <UISeparator invisible />
      <UIInput
        placeholder={translate('forms.name')}
        value={displayName}
        onChangeText={handleSetDisplayName}
      />
      <UIText noPadding>{translate('forms.name')}</UIText>
      <UIInput
        placeholder={translate('forms.email')}
        value={email}
        onChangeText={handleSetEmail}
      />
      <UIText noPadding>{translate('forms.email')}</UIText>
      <UIInput
        placeholder={translate('forms.phoneNumber')}
        value={phoneNumber}
        onChangeText={handleSetPhoneNumber}
      />
      <UIText noPadding>{translate('forms.phoneNumber')}</UIText>
      <UISeparator invisible />
      <UIListItem onPress={handleSetLocation} hasExtra>
        {stringifyLocation(location) || translate('forms.location')}
      </UIListItem>
      <UISeparator invisible />
      <UISwitch value={isOrganization} onValueChange={handleSetIsOrganization}>
        {translate('screens.edit.isOrganization')}
      </UISwitch>
      <UIText>{translate('screens.edit.isOrganizationDesc')}</UIText>
      <UISeparator invisible />
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
