import { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert, View } from 'react-native'
import { useTheme } from '@hooks'
import FormKeyboardAvoidingView from '@templates/form-keyboard-avoiding-view'
import Auth from '@model/auth'
import {
  UIButton,
  UIInput,
  UILink,
  UILoader,
  UIPasswordInput,
  UISeparator,
} from '@ui-elements'
import { emailValidator, passwordValidator } from '@utils/validators'
import { getErrorMessage } from '@utils/functions'
import { Routes } from '@utils/constants'
import { translate } from '@utils/i18n'
import { debugLog } from '@utils/dev'
import type { LoginFormNavigationProp } from '@utils/types/routes'

const LoginForm = ({
  clearErrorsLoginForm,
  clearLoginForm,
  formLogin: { email, password, error, errorMessage },
  setEmail,
  setErrorAndMessage,
  setPassword,
}) => {
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation<LoginFormNavigationProp>()
  const {
    commonStyles: { noAuthFormStyles: styles },
  } = useTheme()

  useEffect(() => {
    clearLoginForm()
    clearErrorsLoginForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const validateFields = useCallback(() => {
    const validStep = {
      email: emailValidator(email),
      password: passwordValidator(password),
    }
    setErrorAndMessage({
      field: 'email',
      error: validStep.email?.error,
      errorMessage: validStep.email?.errorMessage,
    })
    setErrorAndMessage({
      field: 'password',
      error: validStep.password?.error,
      errorMessage: validStep.password?.errorMessage,
    })
    return !validStep.email?.error && !validStep.password?.error
  }, [email, password, setErrorAndMessage])

  const submitForm = useCallback(async () => {
    try {
      setIsLoading(true)
      const userAuth = new Auth({
        email,
        password,
      })
      await userAuth.signIn()
    } catch (err) {
      const fbErrorMessage = getErrorMessage('firebase', err.code)
      Alert.alert(fbErrorMessage)
      // Allow the user to recover the account
      setShowForgotPassword(true)
      setIsLoading(false)
      // Log the actual error
      debugLog(err)
    }
  }, [email, password])

  const validateStep = useCallback(() => {
    const isStepValid = validateFields()

    if (!isStepValid) {
      return
    }

    clearErrorsLoginForm()
    submitForm()
  }, [clearErrorsLoginForm, submitForm, validateFields])

  return (
    <View style={styles.formContainer}>
      <UILoader active={isLoading} transparent />
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
          <UIPasswordInput
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect={false}
            error={error?.password}
            errorMessage={errorMessage?.password}
            onChangeText={setPassword}
            placeholder={translate('forms.password')}
            textContentType="password"
            value={password}
          />
          {showForgotPassword && (
            <>
              <UISeparator invisible />
              <UILink
                onPress={() =>
                  navigation.navigate(Routes.SCREEN_NOAUTH_RECOVER)
                }
                style={styles.forgotPassword}
              >
                {translate('cta.forgotPassword')}
              </UILink>
            </>
          )}
        </FormKeyboardAvoidingView>
      </View>
      <View style={styles.formActions}>
        <UIButton disabled={isLoading} onPress={validateStep}>
          {translate('cta.signIn')}
        </UIButton>
      </View>
    </View>
  )
}

export default LoginForm
