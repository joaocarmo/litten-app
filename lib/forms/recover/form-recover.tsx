import { useCallback, useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import { useTheme } from '@hooks'
import FormKeyboardAvoidingView from '@templates/form-keyboard-avoiding-view'
import Auth from '@model/auth'
import { UIButton, UIInput, UILoader } from '@ui-elements'
import FormStatusTemplate from '@templates/form-status'
import { emailValidator } from '@utils/validators'
import { getErrorMessage } from '@utils/functions'
import { translate } from '@utils/i18n'

const FormRecover = ({
  formLogin: { email, error, errorMessage },
  setEmail,
  setErrorAndMessage,
  clearErrorsLoginForm,
}) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {
    commonStyles: { noAuthFormStyles: styles },
  } = useTheme()

  useEffect(() => {
    clearErrorsLoginForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const validateFields = useCallback(() => {
    const validStep = {
      email: emailValidator(email),
    }
    setErrorAndMessage(
      'email',
      validStep.email?.error,
      validStep.email?.errorMessage,
    )
    return !validStep.email?.error
  }, [email, setErrorAndMessage])

  const submitForm = useCallback(async () => {
    try {
      setIsLoading(true)
      clearErrorsLoginForm()
      const userAuth = new Auth({
        email,
      })
      await userAuth.sendPasswordResetEmail()
      setIsSuccess(true)
    } catch (err) {
      const fbErrorMessage = getErrorMessage('firebase', err.code)
      Alert.alert(fbErrorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [clearErrorsLoginForm, email])

  const validateStep = useCallback(() => {
    const isStepValid = validateFields()

    if (!isStepValid) {
      return
    }

    clearErrorsLoginForm()
    submitForm()
  }, [clearErrorsLoginForm, submitForm, validateFields])

  if (isSuccess) {
    return (
      <FormStatusTemplate success>
        {translate('forms.recoverSentSuccess')}
      </FormStatusTemplate>
    )
  }

  return (
    <>
      <UILoader active={isLoading} transparent />
      <View style={styles.formContainer}>
        <View style={styles.formFields}>
          <FormKeyboardAvoidingView factor={6}>
            <UIInput
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              error={error?.email}
              errorMessage={errorMessage?.email}
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder={translate('forms.email')}
              value={email}
            />
          </FormKeyboardAvoidingView>
        </View>
        <View style={styles.formActions}>
          <UIButton disabled={isLoading} onPress={validateStep}>
            {translate('cta.recoverPassword')}
          </UIButton>
        </View>
      </View>
    </>
  )
}

export default FormRecover
