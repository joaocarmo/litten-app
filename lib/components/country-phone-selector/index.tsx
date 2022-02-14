import { StyleSheet, View } from 'react-native'
import { UIInput, UISelect } from '@ui-elements'
import { mapCountriesToSelector } from '@utils/functions'
import { translate } from '@utils/i18n'
import { countries } from '@data'
import type { UIInputProps } from '@ui-elements/input'
import type { UISelectProps } from '@ui-elements/select'

const inputSpacing = 9
const countryList = countries.map(mapCountriesToSelector)

type ErrorType = {
  country: boolean
  phoneNumber: boolean
}

type ErrorMessageType = {
  country: string
  phoneNumber: string
}

export type CountryPhoneSelectorProps = {
  callingCode: string
  callingCodeEditable: boolean
  country: string
  error: ErrorType
  errorMessage: ErrorMessageType
  onCallingCodeChange: UIInputProps['onChangeText']
  onCountryChange: UISelectProps['onValueChange']
  onPhoneNumberChange: UIInputProps['onChangeText']
  phoneNumber: string
}

const CountryPhoneSelector = ({
  callingCode,
  callingCodeEditable,
  country,
  error,
  errorMessage,
  onCallingCodeChange,
  onCountryChange,
  onPhoneNumberChange,
  phoneNumber,
}: CountryPhoneSelectorProps) => (
  <>
    <UISelect
      placeholder={translate('forms.country')}
      selectedValue={country}
      items={countryList}
      onValueChange={onCountryChange}
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
          onChangeText={onCallingCodeChange}
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
          autoComplete="tel"
          onChangeText={onPhoneNumberChange}
          error={error.phoneNumber}
          errorMessage={errorMessage.phoneNumber}
        />
      </View>
    </View>
  </>
)

CountryPhoneSelector.defaultProps = {
  callingCodeEditable: false,
  error: {
    country: false,
    phoneNumber: false,
  },
  errorMessage: {
    country: '',
    phoneNumber: '',
  },
}

const styles = StyleSheet.create({
  phoneNumberContainer: {
    flexDirection: 'row',
  },
  callingCode: {
    flexDirection: 'column',
    flex: 1,
    marginRight: inputSpacing,
  },
  phoneNumber: {
    flexDirection: 'column',
    flex: 4,
    marginLeft: inputSpacing,
  },
})

export default CountryPhoneSelector
