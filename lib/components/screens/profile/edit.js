/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import User from 'model/user'
import { clearStorage } from 'store'
import { UIButton, UILoader } from 'ui-elements'
import { getErrorMessage, logError } from 'utils/functions'
import { translate } from 'utils/i18n'

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticatedUser,
})

const mapDispatchToProps = () => ({})

const ProfileEditScreen: (args: any) => React$Node = ({
  authenticatedUser: { basic, extra },
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const user = new User({ ...basic, ...extra })

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
    <View style={styles.editContainer}>
      <UILoader active={isLoading} transparent />
      <UIButton onPress={deleteConfirm} danger>
        {translate('screens.profile.editDelete')}
      </UIButton>
    </View>
  )
}

const styles = StyleSheet.create({
  editContainer: {
    flex: 1,
    alignItems: 'center',
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditScreen)
