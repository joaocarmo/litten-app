/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { UIInput } from 'ui-elements'

const StepNameEmail: () => React$Node = ({
  formRegister: { fullName, email },
  setFullName,
  setEmail,
}) => (
  <>
    <UIInput
      value={fullName}
      placeholder="Name"
      autoCorrect={false}
      autoCapitalize="words"
      autoCompleteType="name"
      onChangeText={setFullName}
    />
    <UIInput
      value={email}
      placeholder="Email"
      autoCorrect={false}
      autoCapitalize="none"
      keyboardType="email-address"
      autoCompleteType="email"
      onChangeText={setEmail}
    />
  </>
)

export default StepNameEmail
