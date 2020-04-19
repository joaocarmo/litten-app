/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { UIPasswordInput } from 'ui-elements'

const StepPassword: () => React$Node = ({
  formRegister: { password, passwordConfirm, error, errorMessage },
  setPassword,
  setPasswordConfirm,
}) => (
  <>
    <UIPasswordInput
      value={password}
      placeholder="Create your password"
      autoCorrect={false}
      autoCapitalize="none"
      textContentType="newPassword"
      onChangeText={setPassword}
      error={error?.password}
      errorMessage={errorMessage?.password}
    />
    <UIPasswordInput
      value={passwordConfirm}
      placeholder="Confirm your password"
      autoCorrect={false}
      autoCapitalize="none"
      onChangeText={setPasswordConfirm}
      error={error?.passwordConfirm}
      errorMessage={errorMessage?.passwordConfirm}
    />
  </>
)

export default StepPassword
