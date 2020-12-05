/**
 * @format
 * @flow
 */

import RegisterLoginTemplate from 'templates/register-login'
import FormRegister from 'forms/register'
import { translate } from 'utils/i18n'
import SignInCTA from 'components/welcome/cta-sign-in'

const Register: (args: any) => React$Node = () => {
  return (
    <RegisterLoginTemplate
      header={translate('welcome.screens.headers.register')}
      footer={<SignInCTA />}>
      <FormRegister />
    </RegisterLoginTemplate>
  )
}

export default Register
