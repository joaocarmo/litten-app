/**
 * @format
 * @flow
 */

import { useState } from 'react'
import NewLocationMapForm from './select-location-map'
import NewLocationManualForm from './select-location-manual'

const NewLocationForm: (args: any) => React$Node = (props) => {
  const [formType, setFormType] = useState('map')

  if (formType === 'manual') {
    return <NewLocationManualForm {...props} setFormType={setFormType} />
  }

  return <NewLocationMapForm {...props} setFormType={setFormType} />
}

export default NewLocationForm
