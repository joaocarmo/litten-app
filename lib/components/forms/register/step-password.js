/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { UIInput } from 'ui-elements'

const StepPassword: () => React$Node = ({
  formRegister: { password, passwordConfirm, error, errorMessage },
  setPassword,
  setPasswordConfirm,
}) => (
  <>
    <UIInput
      value={password}
      placeholder="Create your password"
      autoCorrect={false}
      autoCapitalize="none"
      secureTextEntry={true}
      textContentType="newPassword"
      onChangeText={setPassword}
      error={error?.password}
      errorMessage={errorMessage?.password}
    />
    <UIInput
      value={passwordConfirm}
      placeholder="Confirm your password"
      autoCorrect={false}
      autoCapitalize="none"
      secureTextEntry={true}
      onChangeText={setPasswordConfirm}
      error={error?.passwordConfirm}
      errorMessage={errorMessage?.passwordConfirm}
    />
  </>
)

export default StepPassword
