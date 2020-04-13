/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { UIInput } from 'ui-elements'

const StepNameEmail: () => React$Node = () => (
  <>
    <UIInput
      placeholder="Name"
      autoCorrect={false}
      autoCapitalize="words"
      autoCompleteType="name"
    />
    <UIInput
      placeholder="Email"
      autoCorrect={false}
      autoCapitalize="none"
      keyboardType="email-address"
      autoCompleteType="email"
    />
  </>
)

export default StepNameEmail
