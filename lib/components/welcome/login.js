/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import RegisterLoginTemplate from 'templates/register-login'
import FormLogin from 'forms/login'
import { translate } from 'utils/i18n'
import CreateNewCTA from 'components/welcome/cta-create-new'

const Register: (args: any) => Node = () => {
  return (
    <RegisterLoginTemplate
      header={translate('welcome.screens.headers.login')}
      footer={<CreateNewCTA />}>
      <FormLogin />
    </RegisterLoginTemplate>
  )
}

export default Register
