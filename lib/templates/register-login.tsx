import { Keyboard, Pressable, StyleSheet, View } from 'react-native'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import { STRUCTURE_TAB_NAV_HEIGHT } from 'utils/constants'

const RegisterLoginTemplate = ({ children, footer, header }) => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate withGoBack>
        {header}
      </ScreenSimpleHeaderTemplate>
    }
  >
    <Pressable // $FlowFixMe[method-unbinding]
      onPress={Keyboard.dismiss}
      style={styles.container}
    >
      <View style={styles.form}>{children}</View>
      <View style={styles.footer}>{footer}</View>
    </Pressable>
  </ScreenTemplate>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    width: '100%',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: STRUCTURE_TAB_NAV_HEIGHT / 2,
  },
})
export default RegisterLoginTemplate
