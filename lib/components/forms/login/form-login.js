/**
 * @format
 * @flow strict-local
 */

import auth from '@react-native-firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert, StyleSheet, View } from 'react-native'
import { UIButton, UIInput, UILink, UIPasswordInput } from 'ui-elements'
import { emailValidator, passwordValidator } from 'utils/validators'
import { getErrorMessage } from 'utils/functions'
import { translate } from 'utils/i18n'
import { SCREEN_NOAUTH_RECOVER } from 'utils/constants'

const LoginForm: () => React$Node = ({
  formLogin: { email, password, error, errorMessage },
  setEmail,
  setPassword,
  clearLoginForm,
  setErrorAndMessage,
  clearErrorsLoginForm,
}) => {
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation()

  useEffect(() => {
    clearLoginForm()
    clearErrorsLoginForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const validateFields = () => {
    const validStep = {
      email: emailValidator(email),
      password: passwordValidator(password),
    }
    setErrorAndMessage(
      'email',
      validStep.email?.error,
      validStep.email?.errorMessage,
    )
    setErrorAndMessage(
      'password',
      validStep.password?.error,
      validStep.password?.errorMessage,
    )
    return !validStep.email?.error && !validStep.password?.error
  }

  const submitForm = async () => {
    try {
      setIsLoading(true)
      await auth().signInWithEmailAndPassword(email, password)
    } catch (err) {
      const fbErrorMessage = getErrorMessage('firebase', err.code)
      Alert.alert(fbErrorMessage)
      // Allow the user to recover the account
      setShowForgotPassword(true)
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
        <UIPasswordInput
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          error={error?.password}
          errorMessage={errorMessage?.password}
          onChangeText={setPassword}
          placeholder={translate('forms.password')}
          textContentType="password"
          value={password}
        />
        {showForgotPassword && (
          <UILink
            onPress={() => navigation.navigate(SCREEN_NOAUTH_RECOVER)}
            style={styles.forgotPassword}>
            {translate('cta.forgotPassword')}
          </UILink>
        )}
      </View>
      <View style={styles.formActions}>
        <UIButton disabled={isLoading} onPress={validateStep}>
          {translate('cta.signIn')}
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

export default LoginForm
