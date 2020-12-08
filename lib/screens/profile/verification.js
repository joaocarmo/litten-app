/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import FormStatusTemplate from 'templates/form-status'
import { UILoader } from 'ui-elements'
import { useUserUid, useEmailVerified } from 'hooks'
import Auth from 'model/auth'
import User from 'model/user'
import { translate } from 'utils/i18n'

const ProfileVerificationScreen: (args: any) => React$Node = () => {
  const [emailVerified, setEmailVerified] = useEmailVerified()
  const [isLoading, setIsLoading] = useState(true)

  const userUid = useUserUid()

  const auth = useRef(new Auth({})).current
  const user = useRef(new User({ id: userUid })).current

  const refreshAndConfirm = useCallback(async () => {
    await auth.currentUser.reload()
    if (auth.currentUser.emailVerified) {
      user.emailVerified = true
      setEmailVerified(true)
    }
    setIsLoading(false)
  }, [auth.currentUser, setEmailVerified, user])

  useEffect(() => {
    refreshAndConfirm()
  }, [refreshAndConfirm])

  if (isLoading) {
    return <UILoader size="large" />
  }

  return (
    <ScreenTemplate header={<ScreenSimpleHeaderTemplate withGoBack />}>
      <FormStatusTemplate success={emailVerified} error={!emailVerified}>
        {emailVerified
          ? translate('forms.profileEmailVerificationSuccess')
          : translate('feedback.errorMessages.profileUnverifiefEmailError')}
      </FormStatusTemplate>
    </ScreenTemplate>
  )
}

export default ProfileVerificationScreen
