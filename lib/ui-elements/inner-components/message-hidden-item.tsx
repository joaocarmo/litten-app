import { Pressable, Text } from 'react-native'
import { useTheme } from '@hooks'
import uiMessageHiddenItemComponentStyles from '@ui-elements/inner-components/message-hidden-item.styles'

const UIMessageHiddenItem = ({ children, style, ...otherProps }) => {
  const { createStyles } = useTheme()

  const styles = createStyles(uiMessageHiddenItemComponentStyles)

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
