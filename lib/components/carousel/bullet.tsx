import { StyleSheet, View } from 'react-native'
import { useTheme } from '@hooks'
import bulletStyles from '@components/carousel/bullet.styles'
import type { ViewProps } from 'react-native'

export type BulletProps = {
  active?: boolean
  contrast?: boolean
  style?: ViewProps['style']
}

const Bullet = ({ active, contrast, style }: BulletProps) => {
  const { createStyles } = useTheme()

  const styles = createStyles(bulletStyles)

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

Bullet.defaultProps = {
  active: false,
  contrast: false,
  style: undefined,
}

export default Bullet
