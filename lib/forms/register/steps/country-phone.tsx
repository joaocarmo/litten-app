import { useCallback, useEffect, useState } from 'react'
import { getCountryCallingCode } from 'libphonenumber-js/mobile'
import type { CountryCode } from 'libphonenumber-js'
import FormKeyboardAvoidingView from '@templates/form-keyboard-avoiding-view'
import CountryPhoneSelector from '@components/country-phone-selector'

const StepCountryPhone = ({
  formRegister: { country, callingCode, phoneNumber, error, errorMessage },
  setCountry,
  setCallingCode,
  setPhoneNumber,
}) => {
  const [callingCodeEditable, setCallingCodeEditable] = useState(false)

  const handleOnSelectCountry = useCallback(
    (selectedCountry: CountryCode) => {
      setCountry(selectedCountry)

      if (selectedCountry) {
        try {
          const selectedCountryCC = getCountryCallingCode(selectedCountry)

          if (selectedCountryCC) {
            setCallingCode(`+${selectedCountryCC}`)
            setCallingCodeEditable(false)
          }
        } catch (err) {
          setCallingCode('')
          setCallingCodeEditable(true)
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
