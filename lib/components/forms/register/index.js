/**
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { UIButton, UIProgress } from 'ui-elements'
import StepNameEmail from './step-name-email'
import StepPassword from './step-password'
import StepCountryPhone from './step-country-phone'
import StepPhoto from './step-photo'

const formSteps = [
  {
    key: 'step-name-email',
    component: StepNameEmail,
    required: true,
  },
  {
    key: 'step-password',
    component: StepPassword,
    required: true,
  },
  {
    key: 'step-country-phone',
    component: StepCountryPhone,
    required: false,
  },
  {
    key: 'step-photo',
    component: StepPhoto,
    required: false,
  },
]
const totalSteps = formSteps.length

const RegisterForm: () => React$Node = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const validate = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const CurrentStep = formSteps[currentStep - 1].component

  return (
    <View style={styles.formContainer}>
      <View style={styles.formProgress}>
        <UIProgress currentStep={currentStep} totalSteps={totalSteps} />
      </View>
      <View style={styles.formFields}>
        <CurrentStep />
      </View>
      <View style={styles.formActions}>
        <UIButton onPress={validate}>Continue</UIButton>
        {!formSteps[currentStep - 1].required && (
          <UIButton onPress={validate} style={styles.skipButton} secondary>
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
