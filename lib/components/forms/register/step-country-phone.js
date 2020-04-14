/**
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { UIInput, UISelect } from 'ui-elements'
import { countries } from 'data'
import { mapCountriesToSelector } from 'utils/functions'
import { getExternalGeoInformation } from 'utils/network'

const inputSpacing = 9

const countryList = countries.map(mapCountriesToSelector)

const StepCountryPhone: () => React$Node = ({
  formRegister: { country, callingCode, phoneNumber },
  setCountry,
  setCallingCode,
  setPhoneNumber,
}) => {
  useEffect(() => {
    async function setCountryFromIP() {
      const geoData = await getExternalGeoInformation()
      if (geoData) {
        const countryCode = geoData?.country_code || ''
        handleOnSelectCountry(countryCode)
      }
    }

    setCountryFromIP()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOnSelectCountry = (selectedCountry) => {
    setCountry(selectedCountry)
    if (selectedCountry) {
      const [selectedCountryCC] = countries.find(
        ({ cca2 }) => cca2 === selectedCountry,
      )?.callingCodes
      setCallingCode(selectedCountryCC)
    }
  }

  return (
    <>
      <UISelect
        placeholder="Country"
        selectedValue={country}
        items={countryList}
        onValueChange={handleOnSelectCountry}
      />
      <View style={styles.phoneNumberContainer}>
        <UIInput
          value={callingCode}
          placeholder="Code"
          editable={false}
          style={styles.callingCode}
        />
        <UIInput
          value={phoneNumber}
          placeholder="Phone number"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="phone-pad"
          autoCompleteType="tel"
          style={styles.phoneNumber}
          onChangeText={setPhoneNumber}
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

export default StepCountryPhone
