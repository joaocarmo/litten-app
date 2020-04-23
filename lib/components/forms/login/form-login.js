/**
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { UIButton, UIInput, UILink, UIPasswordInput } from 'ui-elements'
import { emailValidator, passwordValidator } from 'utils/validators'

const LoginForm: () => React$Node = ({
  formLogin: { email, password, error, errorMessage },
  setEmail,
  setPassword,
  clearLoginForm,
  setErrorAndMessage,
  clearErrorsLoginForm,
}) => {
  const [showForgotPassword, setShowForgotPassword] = useState(false)

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
    if (validStep.password?.error) {
      // TODO: Move this to after the first failed authentication attempt
      setShowForgotPassword(true)
    }
    return !validStep.email?.error && !validStep.password?.error
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
          placeholder="Email"
          value={email}
        />
        <UIPasswordInput
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          error={error?.password}
          errorMessage={errorMessage?.password}
          onChangeText={setPassword}
          placeholder="Password"
          textContentType="password"
          value={password}
        />
        {showForgotPassword && (
          <UILink style={styles.forgotPassword}>Forgot password?</UILink>
        )}
      </View>
      <View style={styles.formActions}>
        <UIButton onPress={validateStep}>Sign in</UIButton>
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
