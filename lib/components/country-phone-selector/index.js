/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { StyleSheet, View } from 'react-native'
import { UIInput, UISelect } from 'ui-elements'
import { mapCountriesToSelector } from 'utils/functions'
import { translate } from 'utils/i18n'
import { countries } from 'data'

const inputSpacing = 9

const countryList = countries.map(mapCountriesToSelector)

const CountryPhoneSelector: (args: any) => Node = ({
  callingCode,
  callingCodeEditable = false,
  country,
  error = {
    country: false,
    phoneNumber: false,
  },
  errorMessage = {
    country: '',
    phoneNumber: '',
  },
  onCallingCodeChange,
  onCountryChange,
  onPhoneNumberChange,
  phoneNumber,
}) => (
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
          autoCompleteType="tel"
          onChangeText={onPhoneNumberChange}
          error={error.phoneNumber}
          errorMessage={errorMessage.phoneNumber}
        />
      </View>
    </View>
  </>
)

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
