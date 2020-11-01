/**
 * @format
 * @flow
 */

// import debounce from 'lodash.debounce'
import { useRef } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthenticatedUser from 'store/actions/authenticated-user'
import { useState } from 'react'
import { Alert, Pressable, Keyboard, StyleSheet } from 'react-native'
import User from 'model/user'
import { clearStorage } from 'store'
import {
  UIButton,
  UIInput,
  UILoader,
  UISeparator,
  UISwitch,
  UIText,
} from 'ui-elements'
import { getErrorMessage, logError } from 'utils/functions'
import { validPhoneNumber } from 'utils/validators'
import {
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
  setIsOrganization,
  setPhoneNumber,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const user = useRef(new User({ ...basic, ...extra })).current

  const { isOrganization, phoneNumber } = extra

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
      <UIInput
        placeholder={translate('forms.phoneNumber')}
        value={phoneNumber}
        onChangeText={handleSetPhoneNumber}
      />
      <UISwitch value={isOrganization} onValueChange={handleSetIsOrganization}>
        {translate('screens.edit.isOrganization')}
      </UISwitch>
      <UIText>{translate('screens.edit.isOrganizationDesc')}</UIText>
      <UISeparator invisible />
      <UIButton onPress={deleteConfirm} danger>
        {translate('screens.edit.delete')}
      </UIButton>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  editContainer: {
    flex: 1,
    alignItems: 'center',
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditScreen)
