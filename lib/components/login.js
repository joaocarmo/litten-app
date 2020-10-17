/**
 * @format
 * @flow
 */

import RegisterLoginTemplate from 'templates/register-login'
import FormLogin from 'forms/login'
import { translate } from 'utils/i18n'
import CreateNewCTA from './welcome/cta-create-new'

const Register: (args: any) => React$Node = () => {
  return (
    <RegisterLoginTemplate
      header={translate('welcome.screens.headers.login')}
      footer={<CreateNewCTA />}>
      <FormLogin />
    </RegisterLoginTemplate>
  )
}

export default Register
