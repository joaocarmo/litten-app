/**
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react'
import { UISelect } from 'ui-elements'
import { countries } from 'data'
import { mapCountriesToSelector } from 'utils/functions'
import { getExternalGeoInformation } from 'utils/network'

const countryList = countries.map(mapCountriesToSelector)

const StepTwo: () => React$Node = () => {
  const [selectedCountry, setSelectedCountry] = useState('')

  useEffect(() => {
    async function setCountryFromIP() {
      const geoData = await getExternalGeoInformation()
      setSelectedCountry(geoData?.country_code || '')
    }

    setCountryFromIP()
  }, [])

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
