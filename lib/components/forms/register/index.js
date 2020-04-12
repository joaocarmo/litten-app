/**
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { UIButton, UIProgress } from 'ui-elements'
import StepOne from './step-one'
import StepTwo from './step-two'

const totalSteps = 4

const RegisterForm: () => React$Node = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const validate = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  return (
    <View style={styles.formContainer}>
      <View style={styles.formProgress}>
        <UIProgress currentStep={currentStep} totalSteps={totalSteps} />
      </View>
      <View style={styles.formFields}>
        {currentStep === 1 && <StepOne />}
        {currentStep === 2 && <StepTwo />}
      </View>
      <View style={styles.formActions}>
        <UIButton onPress={validate}>Continue</UIButton>
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
})

export default RegisterForm
