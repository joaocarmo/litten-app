/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { UIInput } from 'ui-elements'

const StepPassword: () => React$Node = () => (
  <>
    <UIInput
      placeholder="Create your password"
      autoCorrect={false}
      autoCapitalize="none"
      secureTextEntry={true}
      textContentType="newPassword"
    />
    <UIInput
      placeholder="Repeat your password"
      autoCorrect={false}
      autoCapitalize="none"
      secureTextEntry={true}
    />
  </>
)

export default StepPassword
