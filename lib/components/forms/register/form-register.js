/**
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import Auth from 'model/auth'
import { UIButton, UILoader, UIProgress } from 'ui-elements'
import {
  avatarValidator,
  countryValidator,
  emailValidator,
  displayNameValidator,
  passwordConfirmValidator,
  passwordValidator,
  phoneNumberValidator,
} from 'utils/validators'
import { getLocales } from 'react-native-localize'
import { translate } from 'utils/i18n'
import { getExternalGeoInformation } from 'utils/network'
import { getErrorMessage, logError } from 'utils/functions'
import FormStatusTemplate from 'templates/form-status'
import StepNameEmail from './step-name-email'
import StepPassword from './step-password'
import StepCountryPhone from './step-country-phone'
import StepPhoto from './step-photo'

const RegisterForm: (args: any) => React$Node = (props) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [doneStatus, setDoneStatus] = useState(null)
  const [errorReport, setErrorReport] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const {
    formRegister: {
      avatar,
      callingCode,
      country,
      email,
      displayName,
      password,
      passwordConfirm,
      phoneNumber,
    },
    clearErrorsRegisterForm,
    clearRegisterForm,
    setAvatar,
    setCallingCode,
    setCountry,
    setErrorAndMessage,
    setPhoneNumber,
    toggleAutoRedirectIfLoggedIn,
  } = props

  const formSteps = [
    {
      key: 'step-name-email',
      component: StepNameEmail,
      required: true,
      validate() {
        const validStep = {
          email: emailValidator(email),
          displayName: displayNameValidator(displayName),
        }
        setErrorAndMessage(
          'email',
          validStep.email?.error,
          validStep.email?.errorMessage,
        )
        setErrorAndMessage(
          'displayName',
          validStep.displayName?.error,
          validStep.displayName?.errorMessage,
        )
        return !validStep.email?.error && !validStep.displayName?.error
      },
      clear() {},
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
      clear() {},
    },
    {
      key: 'step-country-phone',
      component: StepCountryPhone,
      required: false,
      validate() {
        const validStep = {
          country: countryValidator(country),
          phoneNumber: phoneNumberValidator(phoneNumber, country, callingCode),
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
        const validStep = { avatar: avatarValidator(avatar) }
        setErrorAndMessage(
          'avatar',
          validStep.avatar?.error,
          validStep.avatar?.errorMessage,
        )
        return !validStep.avatar?.error
      },
      clear() {
        setAvatar(null)
      },
    },
  ]

  const totalSteps = formSteps.length

  useEffect(() => {
    async function setCountryFromIP() {
      const geoData = await getExternalGeoInformation()
      if (geoData) {
        const countryCode = geoData?.country_code || ''
        setCountry(countryCode)
      }
    }

    clearRegisterForm()
    clearErrorsRegisterForm()

    // Get the user's country code from the device
    const { countryCode } = getLocales()
    if (!countryCode) {
      // Determine from the user's location
      setCountryFromIP()
    } else {
      setCountry(countryCode)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submitForm = async () => {
    try {
      toggleAutoRedirectIfLoggedIn(false)
      setIsLoading(true)
      const userAuth = new Auth({
        avatar,
        callingCode,
        country,
        displayName,
        email,
        password,
        phoneNumber,
      })
      await userAuth.createUser()
      setDoneStatus('success')
    } catch (err) {
      const fbErrorMessage = getErrorMessage('firebase', err.code)
      setErrorReport(err.code)
      Alert.alert(fbErrorMessage)
      setDoneStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  const submitErrorReport = () => {
    logError(errorReport)
    Alert.alert(
      translate('forms.reportErrorTitle'),
      translate('forms.reportErrorMessageDone'),
    )
    setIsButtonDisabled(true)
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

  const completeStep = () => {
    if (doneStatus === 'success') {
      toggleAutoRedirectIfLoggedIn(true)
    } else if (doneStatus === 'error') {
      Alert.alert(
        translate('forms.reportErrorTitle'),
        translate('forms.reportErrorMessage'),
        [
          {
            text: translate('cta.yes'),
            onPress: () => submitErrorReport(),
          },
          {
            text: translate('cta.no'),
            onPress: () => null,
          },
        ],
      )
    }
  }

  const CurrentStep = formSteps[currentStep - 1].component

  return (
    <View style={styles.formContainer}>
      <UILoader active={isLoading} transparent />
      <View style={styles.formProgress}>
        <UIProgress currentStep={currentStep} totalSteps={totalSteps} />
      </View>
      <View style={styles.formFields}>
        {!doneStatus && <CurrentStep {...props} />}
        {!!doneStatus && (
          <FormStatusTemplate
            success={doneStatus === 'success'}
            error={doneStatus === 'error'}>
            {doneStatus === 'success'
              ? translate('forms.registrationSuccess')
              : translate('forms.registrationError')}
          </FormStatusTemplate>
        )}
      </View>
      <View style={styles.formActions}>
        {!doneStatus && (
          <>
            <UIButton disabled={isLoading} onPress={validateStep}>
              {translate('cta.continue')}
            </UIButton>
            {!formSteps[currentStep - 1].required && (
              <UIButton
                disabled={isLoading}
                onPress={skipStep}
                style={styles.skipButton}
                secondary>
                {translate('cta.skip')}
              </UIButton>
            )}
          </>
        )}
        {!!doneStatus && (
          <UIButton disabled={isButtonDisabled} onPress={completeStep}>
            {doneStatus === 'success'
              ? translate('cta.done')
              : translate('cta.report')}
          </UIButton>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    height: '100%',
    width: '100%',
  },
  formProgress: {
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
  skipButton: {
    marginTop: 10,
  },
})

export default RegisterForm
