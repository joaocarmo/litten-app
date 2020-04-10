/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { UIButton } from '../ui-elements'
import SignInCTA from './cta-sign-in'

const Actions: () => React$Node = () => {
  const navigation = useNavigation()

  return (
    <>
      <UIButton onPress={() => navigation.navigate('Register')}>
        Get started
      </UIButton>
      <SignInCTA />
    </>
  )
}

export default Actions
