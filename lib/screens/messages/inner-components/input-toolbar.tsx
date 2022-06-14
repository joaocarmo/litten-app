import { InputToolbar as EZInputToolbar } from 'react-native-easy-chat'
import type { IMessage, InputToolbarProps } from 'react-native-easy-chat'
import { useTheme } from '@hooks'
import { UI_MESSAGE_MIN_INPUT_TOOLBAR_HEIGHT } from '@utils/constants'

const InputToolbar = (props: InputToolbarProps<IMessage>) => {
  const {
    createStyles,
    theme: { colors },
  } = useTheme()

  const styles = createStyles((theme) => ({
    inputToolbar: {
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: UI_MESSAGE_MIN_INPUT_TOOLBAR_HEIGHT,
      borderRadius: 50,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      paddingTop: 4,
      paddingLeft: 18,
      paddingRight: 8,
      backgroundColor: theme.colors.background,
    },
    inputToolbarPrimary: {
      minHeight: UI_MESSAGE_MIN_INPUT_TOOLBAR_HEIGHT,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textInputStyle: {
      color: theme.colors.text,
    },
    sendStyle: {
      color: theme.colors.secondary,
    },
  }))

  return (
    <EZInputToolbar
      {...props}
      containerStyle={styles.inputToolbar}
      primaryStyle={styles.inputToolbarPrimary}
      textInputStyle={styles.textInputStyle}
      placeholderTextColor={colors.neutralDark}
      textStyle={styles.sendStyle}
    />
  )
}

export default InputToolbar
