import { Fragment } from 'react'

import { View } from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import { useTheme } from '@hooks'
import { iterateTimes } from '@utils/functions'

const bulletSize = 10
const bulletSizeRadius = Math.floor(bulletSize / 2)
const bulletSizeActive = Math.floor(bulletSize * 1.7)
const bulletSizeActiveRadius = Math.floor(bulletSizeActive / 2)
const pathThickness = 3
const pathLength = vw(20)
const borderWidth = 2.5

const UIProgress = ({ currentStep, totalSteps }) => {
  const { createStyles } = useTheme()
  const styles = createStyles((theme) => ({
    container: {
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
      borderColor: theme.colors.neutral,
      borderWidth,
    },
    activeBullet: {
      height: bulletSizeActive,
      width: bulletSizeActive,
      borderRadius: bulletSizeActiveRadius,
      backgroundColor: theme.colors.secondary,
    },
    doneBullet: {
      height: bulletSize,
      width: bulletSize,
      borderRadius: bulletSizeRadius,
      borderColor: theme.colors.secondary,
      borderWidth,
    },
    inactivePath: {
      height: pathThickness,
      width: pathLength,
      backgroundColor: theme.colors.neutral,
    },
    donePath: {
      height: pathThickness,
      width: pathLength,
      backgroundColor: theme.colors.secondary,
    },
  }))
  return (
    <View style={styles.container}>
      {currentStep === 1 ? (
        <View style={styles.activeBullet} />
      ) : (
        <View style={styles.doneBullet} />
      )}
      {iterateTimes(totalSteps - 2, 2).map((n) => (
        <Fragment key={n}>
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
        </Fragment>
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
}

export default UIProgress
