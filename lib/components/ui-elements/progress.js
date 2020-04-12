/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { View, StyleSheet } from 'react-native'
import colors from 'styles/colors'
import { iterateTimes } from 'utils/functions'

const bulletSize = 10
const bulletSizeRadius = Math.floor(bulletSize / 2)
const bulletSizeActive = Math.floor(bulletSize * 1.7)
const bulletSizeActiveRadius = Math.floor(bulletSizeActive / 2)
const pathThickness = 3
const pathLength = 85
const borderWidth = 2.5

const Progress: () => React$Node = ({ currentStep, totalSteps }) => (
  <View style={styles.container}>
    {currentStep === 1 ? (
      <View style={styles.activeBullet} />
    ) : (
      <View style={styles.doneBullet} />
    )}
    {iterateTimes(totalSteps - 2, 2).map((n) => (
      <React.Fragment key={n}>
        {currentStep === n ? (
          <>
            <View style={styles.donePath} />
            <View style={styles.activeBullet} />
          </>
        ) : (
          <>
            {currentStep > n ? (
              <>
                <View style={styles.donePath} />
                <View style={styles.doneBullet} />
              </>
            ) : (
              <>
                <View style={styles.inactivePath} />
                <View style={styles.inactiveBullet} />
              </>
            )}
          </>
        )}
      </React.Fragment>
    ))}
    {currentStep === totalSteps ? (
      <>
        <View style={styles.donePath} />
        <View style={styles.activeBullet} />
      </>
    ) : (
      <>
        <View style={styles.inactivePath} />
        <View style={styles.inactiveBullet} />
      </>
    )}
  </View>
)

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveBullet: {
    height: bulletSize,
    width: bulletSize,
    borderRadius: bulletSizeRadius,
    borderColor: colors.gray,
    borderWidth,
  },
  activeBullet: {
    height: bulletSizeActive,
    width: bulletSizeActive,
    borderRadius: bulletSizeActiveRadius,
    backgroundColor: colors.blue,
  },
  doneBullet: {
    height: bulletSize,
    width: bulletSize,
    borderRadius: bulletSizeRadius,
    borderColor: colors.blue,
    borderWidth,
  },
  inactivePath: {
    height: pathThickness,
    width: pathLength,
    backgroundColor: colors.gray,
  },
  donePath: {
    height: pathThickness,
    width: pathLength,
    backgroundColor: colors.blue,
  },
})

export default Progress
