import { StyleSheet, View } from 'react-native'
import { useTheme } from '@hooks'
import bulletStyles from '@components/carousel/bullet.styles'

const Bullet = ({ active = false, contrast = false, style }) => {
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

export default Bullet
