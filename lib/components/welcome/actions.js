/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { useNavigation } from '@react-navigation/native'
import { UIButton } from 'ui-elements'
import SignInCTA from 'components/welcome/cta-sign-in'
import { translate } from 'utils/i18n'
import { SCREEN_NOAUTH_REGISTER } from 'utils/constants'

const Actions: () => Node = () => {
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
