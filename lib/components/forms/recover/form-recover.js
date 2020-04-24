/**
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { UIButton, UIInput } from 'ui-elements'
import { emailValidator } from 'utils/validators'
import { translate } from 'utils/i18n'

const FormRecover: () => React$Node = ({
  formLogin: { email, error, errorMessage },
  setEmail,
  setErrorAndMessage,
  clearErrorsLoginForm,
}) => {
  useEffect(() => {
    clearErrorsLoginForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const validateFields = () => {
    const validStep = {
      email: emailValidator(email),
    }
    setErrorAndMessage(
      'email',
      validStep.email?.error,
      validStep.email?.errorMessage,
    )
    return !validStep.email?.error
  }

  const submitForm = () => {
    console.warn('GREAT SUCCESS !')
  }

  const validateStep = () => {
    const isStepValid = validateFields()

    if (!isStepValid) {
      return
    }

    clearErrorsLoginForm()
    submitForm()
  }

  return (
    <View style={styles.formContainer}>
      <View style={styles.formHeader} />
      <View style={styles.formFields}>
        <UIInput
          autoCapitalize="none"
          autoCompleteType="email"
          autoCorrect={false}
          error={error?.email}
          errorMessage={errorMessage?.email}
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder={translate('forms.email')}
          value={email}
        />
      </View>
      <View style={styles.formActions}>
        <UIButton onPress={validateStep}>
          {translate('cta.recoverPassword')}
        </UIButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    height: '100%',
    width: '100%',
  },
  formHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formFields: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formActions: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  forgotPassword: {
    marginTop: 14,
    alignSelf: 'center',
    textDecorationLine: 'none',
  },
  skipButton: {
    marginTop: 10,
  },
})

export default FormRecover
