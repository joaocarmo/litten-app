/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'hooks'

const bulletSize = 6
const bulletSizeBig = bulletSize + 2

const Bullet: (args: any) => Node = ({
  active = false,
  contrast = false,
  style,
}) => {
  const { createStyles } = useTheme()

  const styles = createStyles((theme) => ({
    bullet: {
      height: bulletSize,
      width: bulletSize,
      borderRadius: bulletSize / 2,
      marginHorizontal: 5,
      opacity: 0.5,
      backgroundColor: theme.colors.backgroundAlt,
    },
    bulletActive: {
      opacity: 0.6,
    },
    bulletInactive: {
      opacity: 0.2,
    },
    bulletContrast: {
      height: bulletSizeBig,
      width: bulletSizeBig,
      borderRadius: bulletSizeBig / 2,
      borderColor: theme.colors.textAlt,
      borderStyle: 'solid',
      borderWidth: StyleSheet.hairlineWidth,
    },
  }))

  return (
    <View
      style={[
        StyleSheet.compose(styles.bullet, style),
        active ? styles.bulletActive : styles.bulletInactive,
        contrast ? styles.bulletContrast : undefined,
      ]}
    />
  )
}

export default Bullet
