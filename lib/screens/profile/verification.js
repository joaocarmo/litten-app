/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import FormStatusTemplate from 'templates/form-status'
import { UILoader } from 'ui-elements'
import { useAuthUser } from 'hooks'
import Auth from 'model/auth'
import { getErrorMessage } from 'utils/functions'
import { logError } from 'utils/dev'
import { translate } from 'utils/i18n'

const ProfileVerificationScreen: (args: any) => React$Node = ({
  route: {
    params: { oobCode: actionCode },
  },
}) => {
  const [isLoading, setIsLoading] = useState(true)

  const [authUser, setAuthUser] = useAuthUser()

  const refreshAndConfirm = useCallback(async () => {
    if (!authUser.emailVerified && actionCode) {
      const auth = new Auth({})

      try {
        await auth.checkActionCode(actionCode)
        await auth.applyActionCode(actionCode)
        await auth.currentUser.reload()
      } catch (err) {
        const fbErrorMessage = getErrorMessage('firebase', err.code)
        logError(err)
        Alert.alert(fbErrorMessage)
      }
      setAuthUser(auth.currentUser)
    }

    setIsLoading(false)
  }, [actionCode, authUser.emailVerified, setAuthUser])

  useEffect(() => {
    refreshAndConfirm()
  }, [refreshAndConfirm])

  return (
    <ScreenTemplate header={<ScreenSimpleHeaderTemplate withGoBack />}>
      {isLoading && <UILoader active={isLoading} size="large" />}
      {!isLoading && (
        <FormStatusTemplate
          success={authUser.emailVerified}
          error={!authUser.emailVerified}>
          {authUser.emailVerified
            ? translate('forms.profileEmailVerificationSuccess')
            : translate('feedback.errorMessages.profileUnverifiefEmailError')}
        </FormStatusTemplate>
      )}
    </ScreenTemplate>
  )
}

export default ProfileVerificationScreen
