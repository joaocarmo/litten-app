import { StyleSheet, View } from 'react-native'
import { useTheme } from 'hooks'
import { Litten as LittenLogo } from 'images/components/logo'
import { UI_ABOUT_LOGO_HEIGHT, UI_ABOUT_LOGO_WIDTH } from 'utils/constants'

const Header: () => Node = () => {
  const {
    theme: { colors },
  } = useTheme()
  return (
    <View style={styles.header}>
      <LittenLogo
        height={UI_ABOUT_LOGO_HEIGHT}
        width={UI_ABOUT_LOGO_WIDTH}
        fill={colors.secondary}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
export default Header
