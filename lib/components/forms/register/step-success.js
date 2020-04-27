/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import FormStatusTemplate from 'templates/form-status'
import { translate } from 'utils/i18n'

const StepSuccess: () => React$Node = () => (
  <FormStatusTemplate success>
    {translate('forms.registrationSuccess')}
  </FormStatusTemplate>
)

export default StepSuccess
