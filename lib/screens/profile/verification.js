/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useState } from 'react'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import FormStatusTemplate from 'templates/form-status'
import { UILoader } from 'ui-elements'
import { useAuthUser } from 'hooks'
import Auth from 'model/auth'
import { translate } from 'utils/i18n'

const ProfileVerificationScreen: (args: any) => React$Node = () => {
  const [isLoading, setIsLoading] = useState(true)

  const [authUser, setAuthUser] = useAuthUser()

  const refreshAndConfirm = useCallback(async () => {
    if (!authUser.emailVerified) {
      const auth = new Auth({})
      await auth.currentUser.reload()
      setAuthUser(auth.currentUser)
    }

    setIsLoading(false)
  }, [authUser.emailVerified, setAuthUser])

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
