/**
 * @format
 * @flow
 */

import { UIInput } from 'ui-elements'
import { translate } from 'utils/i18n'

const StepNameEmail: (args: any) => React$Node = ({
  formRegister: { displayName, email, error, errorMessage },
  setDisplayName,
  setEmail,
}) => (
  <>
    <UIInput
      value={displayName}
      placeholder={translate('forms.name')}
      autoCorrect={false}
      autoCapitalize="words"
      autoCompleteType="name"
      onChangeText={setDisplayName}
      error={error?.displayName}
      errorMessage={errorMessage?.displayName}
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
