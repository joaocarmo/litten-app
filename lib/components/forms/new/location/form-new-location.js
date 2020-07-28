/**
 * @format
 * @flow
 */

import React, { useState } from 'react'
import NewLocationMapForm from './form-new-location-map'
import NewLocationManualForm from './form-new-location-manual'

const NewLocationForm: () => React$Node = (props) => {
  const [formType, setFormType] = useState('map')

  if (formType === 'manual') {
    return <NewLocationManualForm {...props} setFormType={setFormType} />
  }

  return <NewLocationMapForm {...props} setFormType={setFormType} />
}

export default NewLocationForm
