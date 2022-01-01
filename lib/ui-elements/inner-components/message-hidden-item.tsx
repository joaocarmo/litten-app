import { Pressable, Text } from 'react-native'
import { useTheme } from '@hooks'
import { UI_HIDDEN_OPTION_WIDTH, UI_PRESSED_OPACITY } from '@utils/constants'

const UIMessageHiddenItem = ({ children, style, ...otherProps }) => {
  const { createStyles } = useTheme()
  const styles = createStyles((theme, typography) => ({
    uiMessageHiddenItem: {
      minWidth: UI_HIDDEN_OPTION_WIDTH,
      height: 64,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.neutralDark,
      opacity: 1,
    },
    uiMessageHiddenItemText: {
      color: theme.colors.textAlt,
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.bolder,
    },
    uiMessageHiddenItemPressed: {
      opacity: UI_PRESSED_OPACITY,
    },
  }))
  return (
    <Pressable
      style={({ pressed }) => [
        styles.uiMessageHiddenItem,
        style,
        pressed ? styles.uiMessageHiddenItemPressed : undefined,
      ]}
      {...otherProps}
    >
      {typeof children === 'string' ? (
        <Text style={styles.uiMessageHiddenItemText}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  )
}

export default UIMessageHiddenItem
