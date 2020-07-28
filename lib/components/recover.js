/**
 * @format
 * @flow
 */

import React from 'react'
import RegisterLoginTemplate from 'templates/register-login'
import FormRecover from 'forms/recover'
import { translate } from 'utils/i18n'

const Recover: () => React$Node = () => {
  return (
    <RegisterLoginTemplate
      header={translate('welcome.screens.headers.recover')}>
      <FormRecover />
    </RegisterLoginTemplate>
  )
}

export default Recover
