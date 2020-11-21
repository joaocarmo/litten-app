/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useState } from 'react'
import { getCountryCallingCode } from 'libphonenumber-js/mobile'
import CountryPhoneSelector from 'components/country-phone-selector'

const StepCountryPhone: (args: any) => React$Node = ({
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
  )
}

export default StepCountryPhone
