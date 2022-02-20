import FormKeyboardAvoidingView from '@templates/form-keyboard-avoiding-view'
import { UIInput } from '@ui-elements'
import { translate } from '@utils/i18n'

const StepNameEmail = ({
  formRegister: { displayName, email, error, errorMessage },
  setDisplayName,
  setEmail,
}) => (
  <FormKeyboardAvoidingView>
    <UIInput
      value={displayName}
      placeholder={translate('forms.name')}
      autoCorrect={false}
      autoCapitalize="words"
      autoComplete="name"
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
      autoComplete="email"
      onChangeText={setEmail}
      error={error?.email}
      errorMessage={errorMessage?.email}
    />
  </FormKeyboardAvoidingView>
)

export default StepNameEmail
