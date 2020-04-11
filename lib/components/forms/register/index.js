/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { UIButton } from 'ui-elements'
import Progress from 'components/progress'
import StepOne from './step-one'

const RegisterForm: () => React$Node = () => (
  <View style={styles.formContainer}>
    <View style={styles.formProgress}>
      <Progress currentStep={1} totalSteps={4} />
    </View>
    <View style={styles.formFields}>
      <StepOne />
    </View>
    <View style={styles.formActions}>
      <UIButton>Continue</UIButton>
    </View>
  </View>
)

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
