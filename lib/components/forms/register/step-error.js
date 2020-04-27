/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import FormStatusTemplate from 'templates/form-status'
import { translate } from 'utils/i18n'

const StepError: () => React$Node = () => (
  <FormStatusTemplate success>
    {translate('forms.registrationError')}
  </FormStatusTemplate>
)

export default StepError
