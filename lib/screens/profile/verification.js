/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useState } from 'react'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import FormStatusTemplate from 'templates/form-status'
import { UILoader } from 'ui-elements'
import { useAuthUser, useEmailVerified, useUserUid } from 'hooks'
import Auth from 'model/auth'
import User from 'model/user'
import { translate } from 'utils/i18n'

const ProfileVerificationScreen: (args: any) => React$Node = () => {
  const [isLoading, setIsLoading] = useState(true)

  const [emailVerified, setEmailVerified] = useEmailVerified()

  const authUser = useAuthUser()
  const userUid = useUserUid()

  const refreshAndConfirm = useCallback(async () => {
    if (!authUser.emailVerified) {
      const auth = new Auth({})
      await auth.currentUser.reload()
    }

    if (authUser.emailVerified && !emailVerified) {
      const user = new User({ id: userUid })
      user.emailVerified = true
      setIsLoading(false)
    }
  }, [authUser.emailVerified, emailVerified, userUid])

  useEffect(() => {
    refreshAndConfirm()

    return () => authUser.emailVerified && setEmailVerified(true)
  }, [authUser.emailVerified, refreshAndConfirm, setEmailVerified])

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
