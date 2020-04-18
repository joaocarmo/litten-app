/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import RegisterLoginTemplate from 'templates/register-login'
import FormLogin from 'forms/login'
import CreateNewCTA from './welcome/cta-create-new'

const Register: () => React$Node = () => {
  return (
    <RegisterLoginTemplate header="Existing Account" footer={<CreateNewCTA />}>
      <FormLogin />
    </RegisterLoginTemplate>
  )
}

export default Register
