/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import RegisterLoginTemplate from 'templates/register-login'
import FormRecover from 'forms/recover'

const Recover: () => React$Node = () => {
  return (
    <RegisterLoginTemplate header="Recover Account">
      <FormRecover />
    </RegisterLoginTemplate>
  )
}

export default Recover
