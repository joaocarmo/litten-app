/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { UIInput } from 'ui-elements'
import { translate } from 'utils/i18n'

const StepNameEmail: () => React$Node = ({
  formRegister: { fullName, email, error, errorMessage },
  setFullName,
  setEmail,
}) => (
  <>
    <UIInput
      value={fullName}
      placeholder={translate('forms.name')}
      autoCorrect={false}
      autoCapitalize="words"
      autoCompleteType="name"
      onChangeText={setFullName}
      error={error?.fullName}
      errorMessage={errorMessage?.fullName}
    />
    <UIInput
      value={email}
      placeholder={translate('forms.email')}
      autoCorrect={false}
      autoCapitalize="none"
      keyboardType="email-address"
      autoCompleteType="email"
      onChangeText={setEmail}
      error={error?.email}
      errorMessage={errorMessage?.email}
    />
  </>
)

export default StepNameEmail
