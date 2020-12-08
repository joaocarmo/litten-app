/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useState } from 'react'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import FormStatusTemplate from 'templates/form-status'
import { UILoader } from 'ui-elements'
import { useAuthUser, useEmailVerified, useUserInfo } from 'hooks'
import Auth from 'model/auth'
import User from 'model/user'
import { translate } from 'utils/i18n'

const ProfileVerificationScreen: (args: any) => React$Node = () => {
  const [isLoading, setIsLoading] = useState(true)

  const [userInfo, setUserInfo] = useUserInfo()
  const [emailVerified] = useEmailVerified()

  const authUser = useAuthUser()

  const refreshAndConfirm = useCallback(async () => {
    if (!authUser.emailVerified) {
      const auth = new Auth({})
      await auth.currentUser.reload()
    }

    if (authUser.emailVerified && !emailVerified) {
      const user = new User({ id: userInfo.id })
      user.emailVerified = true
      await user.get()
      setUserInfo(user.toJSON())
      setIsLoading(false)
    }
  }, [authUser.emailVerified, emailVerified, setUserInfo, userInfo.id])

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
