/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { UIInput } from 'ui-elements'

const StepOne: () => React$Node = () => (
  <>
    <UIInput placeholder="Name" autoCorrect={false} autoCapitalize="words" />
    <UIInput
      placeholder="Email"
      autoCorrect={false}
      autoCapitalize="none"
      keyboardType="email-address"
    />
  </>
)

export default StepOne
