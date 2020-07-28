/**
 * @format
 * @flow
 */

import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { UIButton } from 'ui-elements'
import { translate } from 'utils/i18n'
import SignInCTA from './cta-sign-in'
import { SCREEN_NOAUTH_REGISTER } from 'utils/constants'

const Actions: () => React$Node = () => {
  const navigation = useNavigation()

  return (
    <>
      <UIButton onPress={() => navigation.navigate(SCREEN_NOAUTH_REGISTER)}>
        {translate('cta.getStarted')}
      </UIButton>
      <SignInCTA />
    </>
  )
}

export default Actions
