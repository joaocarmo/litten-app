/**
 * @format
 * @flow
 */

import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { getCountryCallingCode } from 'libphonenumber-js/mobile'
import { UIInput, UISelect } from 'ui-elements'
import { mapCountriesToSelector } from 'utils/functions'
import { translate } from 'utils/i18n'
import { countries } from 'data'

const inputSpacing = 9

const countryList = countries.map(mapCountriesToSelector)

const StepCountryPhone: () => React$Node = ({
  formRegister: { country, callingCode, phoneNumber, error, errorMessage },
  setCountry,
  setCallingCode,
  setPhoneNumber,
}) => {
  const [callingCodeEditable, setCallingCodeEditable] = useState(false)

  useEffect(() => {
    if (country && !callingCode) {
      handleOnSelectCountry(country)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOnSelectCountry = (selectedCountry) => {
    setCountry(selectedCountry)
    if (selectedCountry) {
      let selectedCountryCC = ''

      try {
        selectedCountryCC = getCountryCallingCode(selectedCountry)
      } catch (err) {
        setCallingCode('')
        setCallingCodeEditable(true)
      }

      if (selectedCountryCC) {
        setCallingCode(`+${selectedCountryCC}`)
        setCallingCodeEditable(false)
      }
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
            placeholder={translate('forms.callingCode')}
            autoCapitalize="none"
            keyboardType="phone-pad"
            editable={callingCodeEditable}
            onChangeText={setCallingCode}
            error={error.phoneNumber}
          />
        </View>
        <View style={styles.phoneNumber}>
          <UIInput
            value={phoneNumber}
            placeholder={translate('forms.phoneNumber')}
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
