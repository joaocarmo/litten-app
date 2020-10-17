/**
 * @format
 * @flow
 */

import { useEffect, useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import Auth from 'model/auth'
import { UIButton, UIInput } from 'ui-elements'
import FormStatusTemplate from 'templates/form-status'
import { emailValidator } from 'utils/validators'
import { getErrorMessage } from 'utils/functions'
import { translate } from 'utils/i18n'

const FormRecover: (args: any) => React$Node = ({
  formLogin: { email, error, errorMessage },
  setEmail,
  setErrorAndMessage,
  clearErrorsLoginForm,
}) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

  const submitForm = async () => {
    try {
      setIsLoading(true)
      clearErrorsLoginForm()
      const userAuth = new Auth({ email })
      await userAuth.sendPasswordResetEmail()
      setIsSuccess(true)
    } catch (err) {
      const fbErrorMessage = getErrorMessage('firebase', err.code)
      Alert.alert(fbErrorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const validateStep = () => {
    const isStepValid = validateFields()

    if (!isStepValid) {
      return
    }

    clearErrorsLoginForm()
    submitForm()
  }

  if (isSuccess) {
    return (
      <FormStatusTemplate success>
        {translate('forms.recoverSentSuccess')}
      </FormStatusTemplate>
    )
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
        <UIButton disabled={isLoading} onPress={validateStep}>
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
