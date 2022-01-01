import { useCallback, useEffect, useMemo, useState, FC } from 'react'
import { Alert, View } from 'react-native'
import { getLocales } from 'react-native-localize'
import { useTheme } from '@hooks'
import { createNewUser } from '@db/maintenance'
import { UIButton, UILoader, UIProgress, UISeparator } from '@ui-elements'
import {
  avatarValidator,
  countryValidator,
  emailValidator,
  displayNameValidator,
  passwordConfirmValidator,
  passwordValidator,
  phoneNumberValidator,
} from '@utils/validators'
import FormStatusTemplate from '@templates/form-status'
import StepNameEmail from '@forms/register/steps/name-email'
import StepPassword from '@forms/register/steps/password'
import StepCountryPhone from '@forms/register/steps/country-phone'
import StepPhoto from '@forms/register/steps/photo'
import { openURL } from '@utils/ui'
import { getExternalGeoInformation } from '@utils/network'
import { getErrorMessage } from '@utils/functions'
import { WEB_APP_BASE, WEB_APP_TERMS_AND_CONDITIONS } from '@utils/constants'
import { logError } from '@utils/dev'
import { translate } from '@utils/i18n'

const RegisterForm = (props): FC => {
  const [currentStep, setCurrentStep] = useState(1)
  const [doneStatus, setDoneStatus] = useState(null)
  const [errorReport, setErrorReport] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const {
    commonStyles: { noAuthFormStyles: styles },
  } = useTheme()

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
    setAutoRedirectIfLoggedIn,
  } = props

  const formSteps = useMemo(
    () => [
      {
        key: 'step-name-email',
        component: StepNameEmail,
        required: true,

        validate() {
          const validStep = {
            email: emailValidator(email),
            displayName: displayNameValidator(displayName),
          }
          setErrorAndMessage({
            field: 'email',
            error: validStep.email?.error,
            errorMessage: validStep.email?.errorMessage,
          })
          setErrorAndMessage({
            field: 'displayName',
            error: validStep.displayName?.error,
            errorMessage: validStep.displayName?.errorMessage,
          })
          return !validStep.email?.error && !validStep.displayName?.error
        },

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        clear() {},
      },
      {
        key: 'step-password',
        component: StepPassword,
        required: true,

        validate() {
          const validStep = {
            password: passwordValidator(password),
            passwordConfirm: passwordConfirmValidator(
              password,
              passwordConfirm,
            ),
          }
          setErrorAndMessage({
            field: 'password',
            error: validStep.password?.error,
            errorMessage: validStep.password?.errorMessage,
          })
          setErrorAndMessage({
            field: 'passwordConfirm',
            error: validStep.passwordConfirm?.error,
            errorMessage: validStep.passwordConfirm?.errorMessage,
          })
          return !validStep.password?.error && !validStep.passwordConfirm?.error
        },

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        clear() {},
      },
      {
        key: 'step-country-phone',
        component: StepCountryPhone,
        required: false,

        validate() {
          const validStep = {
            country: countryValidator(country),
            phoneNumber: phoneNumberValidator(
              phoneNumber,
              country,
              callingCode,
            ),
          }
          setErrorAndMessage({
            field: 'country',
            error: validStep.country?.error,
            errorMessage: validStep.country?.errorMessage,
          })
          setErrorAndMessage({
            field: 'phoneNumber',
            error: validStep.phoneNumber?.error,
            errorMessage: validStep.phoneNumber?.errorMessage,
          })
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
          const validStep = {
            avatar: avatarValidator(avatar),
          }
          setErrorAndMessage({
            field: 'avatar',
            error: validStep.avatar?.error,
            errorMessage: validStep.avatar?.errorMessage,
          })
          return !validStep.avatar?.error
        },

        clear() {
          setAvatar(null)
        },
      },
    ],
    [
      avatar,
      callingCode,
      country,
      displayName,
      email,
      password,
      passwordConfirm,
      phoneNumber,
      setAvatar,
      setCallingCode,
      setCountry,
      setErrorAndMessage,
      setPhoneNumber,
    ],
  )

  const totalSteps = formSteps.length

  const setCountryFromIP = useCallback(async () => {
    const geoData = await getExternalGeoInformation()

    if (geoData) {
      const countryCode = geoData?.country_code || ''
      setCountry(countryCode)
    }
  }, [setCountry])

  useEffect(() => {
    clearRegisterForm()
    clearErrorsRegisterForm()
    // Get the user's country code from the device
    const { countryCode } = getLocales()

    if (!countryCode) {
      // Determine from the user's location
      setCountryFromIP()
    } else {
      setCountry(countryCode)
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submitForm = useCallback(async () => {
    try {
      setAutoRedirectIfLoggedIn(false)
      setIsLoading(true)
      await createNewUser({
        photoURL: avatar?.uri,
        callingCode,
        country,
        displayName,
        email,
        password,
        phoneNumber,
      })
      setDoneStatus('success')
    } catch (err) {
      const fbErrorMessage = getErrorMessage('firebase', err.code)
      setErrorReport(err)
      Alert.alert(fbErrorMessage)
      setDoneStatus('error')
      setAutoRedirectIfLoggedIn(true)
    } finally {
      setIsLoading(false)
    }
  }, [
    avatar?.uri,
    callingCode,
    country,
    displayName,
    email,
    password,
    phoneNumber,
    setAutoRedirectIfLoggedIn,
  ])

  const acceptTermsAndConditions = useCallback(() => {
    Alert.alert(
      translate('forms.registrationTermsAndConditionsTitle'),
      translate('forms.registrationTermsAndConditionsMessage'),
      [
        {
          text: translate('cta.agree'),
          onPress: () => submitForm(),
        },
        {
          text: translate('cta.read'),
          onPress: () =>
            openURL(`${WEB_APP_BASE}${WEB_APP_TERMS_AND_CONDITIONS}`),
        },
        {
          text: translate('cta.cancel'),
          onPress: () => null,
          style: 'cancel',
        },
      ],
    )
  }, [submitForm])

  const submitErrorReport = useCallback(() => {
    logError(new Error(errorReport))
    Alert.alert(
      translate('forms.reportErrorTitle'),
      translate('forms.reportErrorMessageDone'),
    )
    setIsButtonDisabled(true)
  }, [errorReport])

  const validateStep = useCallback(() => {
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
      acceptTermsAndConditions()
    }
  }, [
    acceptTermsAndConditions,
    clearErrorsRegisterForm,
    currentStep,
    formSteps,
    totalSteps,
  ])

  const skipStep = useCallback(() => {
    const clearFn = formSteps[currentStep - 1]?.clear

    if (typeof clearFn === 'function') {
      clearErrorsRegisterForm()
      clearFn()

      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1)
      } else {
        acceptTermsAndConditions()
      }
    }
  }, [
    acceptTermsAndConditions,
    clearErrorsRegisterForm,
    currentStep,
    formSteps,
    totalSteps,
  ])

  const completeStep = useCallback(() => {
    if (doneStatus === 'success') {
      setIsButtonDisabled(true)
      setAutoRedirectIfLoggedIn(true)
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
  }, [doneStatus, setAutoRedirectIfLoggedIn, submitErrorReport])

  const CurrentStep = useMemo(
    () => formSteps[currentStep - 1].component,
    [currentStep, formSteps],
  )

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
            error={doneStatus === 'error'}
          >
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
              <>
                <UISeparator invisible small />
                <UIButton disabled={isLoading} onPress={skipStep} secondary>
                  {translate('cta.skip')}
                </UIButton>
              </>
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

export default RegisterForm
