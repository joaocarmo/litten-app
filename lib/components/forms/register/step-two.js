/**
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react'
import { UISelect } from 'ui-elements'
import { countries } from 'data'
import { mapCountriesToSelector } from 'utils/functions'

const countryList = countries.map(mapCountriesToSelector)

const StepTwo: () => React$Node = () => {
  const [selectedCountry, setSelectedCountry] = useState('')

  return (
    <>
      <UISelect
        selectedValue={selectedCountry}
        items={countryList}
        onValueChange={(country) => setSelectedCountry(country)}
      />
    </>
  )
}

export default StepTwo
