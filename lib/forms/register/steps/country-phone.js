/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useState } from 'react'
import type { Node } from 'react'
import { getCountryCallingCode } from 'libphonenumber-js/mobile'
import FormKeyboardAvoidingView from 'templates/form-keyboard-avoiding-view'
import CountryPhoneSelector from 'components/country-phone-selector'

const StepCountryPhone: (args: any) => Node = ({
  formRegister: { country, callingCode, phoneNumber, error, errorMessage },
  setCountry,
  setCallingCode,
  setPhoneNumber,
}) => {
  const [callingCodeEditable, setCallingCodeEditable] = useState(false)

  const handleOnSelectCountry = useCallback(
    (selectedCountry) => {
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
    },
    [setCallingCode, setCountry],
  )

  useEffect(() => {
    if (country && !callingCode) {
      handleOnSelectCountry(country)
    }
  }, [callingCode, country, handleOnSelectCountry])

  return (
    <FormKeyboardAvoidingView>
      <CountryPhoneSelector
        callingCode={callingCode}
        country={country}
        phoneNumber={phoneNumber}
        error={error}
        errorMessage={errorMessage}
        onCallingCodeChange={setCallingCode}
        onCountryChange={handleOnSelectCountry}
        onPhoneNumberChange={setPhoneNumber}
        callingCodeEditable={callingCodeEditable}
      />
    </FormKeyboardAvoidingView>
  )
}

export default StepCountryPhone
