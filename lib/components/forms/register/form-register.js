/**
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { UIButton, UIProgress } from 'ui-elements'
import StepNameEmail from './step-name-email'
import StepPassword from './step-password'
import StepCountryPhone from './step-country-phone'
import StepPhoto from './step-photo'
import {
  countryValidator,
  emailValidator,
  fullNameValidator,
  passwordConfirmValidator,
  passwordValidator,
  phoneNumberValidator,
} from 'utils/validators'

const RegisterForm: () => React$Node = (props) => {
  const [currentStep, setCurrentStep] = useState(1)

  const {
    formRegister: {
      country,
      email,
      fullName,
      password,
      passwordConfirm,
      phoneNumber,
    },
    setAvatar,
    setCallingCode,
    setCountry,
    setErrorAndMessage,
    setPhoneNumber,
    clearErrorsRegisterForm,
    clearRegisterForm,
  } = props

  const formSteps = [
    {
      key: 'step-name-email',
      component: StepNameEmail,
      required: true,
      validate() {
        const validStep = {
          email: emailValidator(email),
          fullName: fullNameValidator(fullName),
        }
        setErrorAndMessage(
          'email',
          validStep.email?.error,
          validStep.email?.errorMessage,
        )
        setErrorAndMessage(
          'fullName',
          validStep.fullName?.error,
          validStep.fullName?.errorMessage,
        )
        return !validStep.email?.error && !validStep.fullName?.error
      },
    },
    {
      key: 'step-password',
      component: StepPassword,
      required: true,
      validate() {
        const validStep = {
          password: passwordValidator(password),
          passwordConfirm: passwordConfirmValidator(password, passwordConfirm),
        }
        setErrorAndMessage(
          'password',
          validStep.password?.error,
          validStep.password?.errorMessage,
        )
        setErrorAndMessage(
          'passwordConfirm',
          validStep.passwordConfirm?.error,
          validStep.passwordConfirm?.errorMessage,
        )
        return !validStep.password?.error && !validStep.passwordConfirm?.error
      },
    },
    {
      key: 'step-country-phone',
      component: StepCountryPhone,
      required: false,
      validate() {
        const validStep = {
          country: countryValidator(country),
          phoneNumber: phoneNumberValidator(phoneNumber, country),
        }
        setErrorAndMessage(
          'country',
          validStep.country?.error,
          validStep.country?.errorMessage,
        )
        setErrorAndMessage(
          'phoneNumber',
          validStep.phoneNumber?.error,
          validStep.phoneNumber?.errorMessage,
        )
        return !validStep.country?.error && !validStep.phoneNumber?.error
      },
      clear() {
        setCountry('')
        setCallingCode('')
        setPhoneNumber('')
      },
    },
    {
      key: 'step-photo',
      component: StepPhoto,
      required: false,
      validate() {
        return true
      },
      clear() {
        setAvatar('')
      },
    },
  ]

  const totalSteps = formSteps.length

  useEffect(() => {
    clearRegisterForm()
    clearErrorsRegisterForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submitForm = () => {
    console.warn('FORM SUBMITTED !')
  }

  const validateStep = () => {
    let isStepValid = false
    const validateFn = formSteps[currentStep - 1]?.validate

    if (typeof validateFn === 'function') {
      isStepValid = validateFn()
    }

    if (!isStepValid) {
      return
    }

    clearErrorsRegisterForm()

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      submitForm()
    }
  }

  const skipStep = () => {
    const clearFn = formSteps[currentStep - 1]?.clear
    if (typeof clearFn === 'function') {
      clearErrorsRegisterForm()
      clearFn()
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1)
      } else {
        submitForm()
      }
    }
  }

  const CurrentStep = formSteps[currentStep - 1].component

  return (
    <View style={styles.formContainer}>
      <View style={styles.formProgress}>
        <UIProgress currentStep={currentStep} totalSteps={totalSteps} />
      </View>
      <View style={styles.formFields}>
        <CurrentStep {...props} />
      </View>
      <View style={styles.formActions}>
        <UIButton onPress={validateStep}>Continue</UIButton>
        {!formSteps[currentStep - 1].required && (
          <UIButton onPress={skipStep} style={styles.skipButton} secondary>
            Skip
          </UIButton>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    display: 'flex',
    height: '100%',
    width: '100%',
  },
  formProgress: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formFields: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  formActions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  skipButton: {
    marginTop: 10,
  },
})

export default RegisterForm
