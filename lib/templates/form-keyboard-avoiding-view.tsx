import { KeyboardAvoidingView } from 'react-native'
import { useTheme } from 'hooks'
import { DEVICE_HEIGHT } from 'utils/constants'

const FormKeyboardAvoidingView = ({ children, factor = 4 }) => {
  const { createStyles } = useTheme()
  const styles = createStyles((theme) => ({
    container: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentContainer: {
      width: '100%',
      backgroundColor: theme.colors.neutralLight,
    },
  }))
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Math.round(DEVICE_HEIGHT / factor)}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      {children}
    </KeyboardAvoidingView>
  )
}

export default FormKeyboardAvoidingView
