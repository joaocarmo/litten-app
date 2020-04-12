/**
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { UIInput, UISelect } from 'ui-elements'
import { countries } from 'data'
import { mapCountriesToSelector } from 'utils/functions'
import { getExternalGeoInformation } from 'utils/network'

const inputSpacing = 9

const countryList = countries.map(mapCountriesToSelector)

const StepTwo: () => React$Node = () => {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [callingCode, setCallingCode] = useState('')

  useEffect(() => {
    async function setCountryFromIP() {
      const geoData = await getExternalGeoInformation()
      if (geoData) {
        const countryCode = geoData?.country_code || ''
        handleOnSelectCountry(countryCode)
      }
    }

    setCountryFromIP()
  }, [])

  const handleOnSelectCountry = (country) => {
    setSelectedCountry(country)
    if (country) {
      const [selectedCountryCC] = countries.find(
        ({ cca2 }) => cca2 === country,
      )?.callingCodes
      setCallingCode(selectedCountryCC)
    }
  }

  return (
    <>
      <UISelect
        placeholder="Country"
        selectedValue={selectedCountry}
        items={countryList}
        onValueChange={handleOnSelectCountry}
      />
      <View style={styles.phoneNumberContainer}>
        <UIInput
          placeholder="Code"
          editable={false}
          value={callingCode}
          style={styles.callingCode}
        />
        <UIInput
          placeholder="Phone number"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="phone-pad"
          style={styles.phoneNumber}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  phoneNumberContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  callingCode: {
    flex: 1,
    marginRight: inputSpacing,
  },
  phoneNumber: {
    flex: 4,
    marginLeft: inputSpacing,
  },
})

export default StepTwo
