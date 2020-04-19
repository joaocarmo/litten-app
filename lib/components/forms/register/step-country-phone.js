/**
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { UIInput, UISelect } from 'ui-elements'
import { countries } from 'data'
import { mapCountriesToSelector } from 'utils/functions'

const inputSpacing = 9

const countryList = countries.map(mapCountriesToSelector)

const StepCountryPhone: () => React$Node = ({
  formRegister: { country, callingCode, phoneNumber, error, errorMessage },
  setCountry,
  setCallingCode,
  setPhoneNumber,
}) => {
  useEffect(() => {
    if (country && !callingCode) {
      handleOnSelectCountry(country)
    }
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
        error={error.country}
        errorMessage={errorMessage.country}
      />
      <View style={styles.phoneNumberContainer}>
        <View style={styles.callingCode}>
          <UIInput
            value={callingCode}
            placeholder="Code"
            editable={false}
            error={error.country}
          />
        </View>
        <View style={styles.phoneNumber}>
          <UIInput
            value={phoneNumber}
            placeholder="Phone number"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="phone-pad"
            autoCompleteType="tel"
            onChangeText={setPhoneNumber}
            error={error.phoneNumber}
            errorMessage={errorMessage.phoneNumber}
          />
        </View>
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
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginRight: inputSpacing,
  },
  phoneNumber: {
    display: 'flex',
    flexDirection: 'column',
    flex: 4,
    marginLeft: inputSpacing,
  },
})

export default StepCountryPhone
