import { useCallback } from 'react'
import { useTheme } from '@hooks'
import { useActionSheet } from '@expo/react-native-action-sheet'
import Clipboard from '@react-native-community/clipboard'
import { Bubble as GCBubble } from 'react-native-gifted-chat'
import { translate } from '@utils/i18n'
import bubbleStyles from './bubble.styles'

const Bubble = (props) => {
  const { showActionSheetWithOptions } = useActionSheet()
  const { createStyles } = useTheme()

  const styles = createStyles(bubbleStyles)

  const onLongPress = useCallback(
    (context, currentMessage) => {
      if (currentMessage?.text) {
        const options = [translate('cta.copy'), translate('cta.cancel')]
        showActionSheetWithOptions(
          {
            options,
            destructiveButtonIndex: null,
            cancelButtonIndex: options.length - 1,
          },
          (buttonIndex) => {
            if (buttonIndex === 0) {
              Clipboard.setString(currentMessage.text)
            }
          },
        )
      }
    },
    [showActionSheetWithOptions],
  )

  return (
    <GCBubble
      {...props}
      textStyle={{
        left: styles.textStyle,
        right: styles.textStyle,
      }}
      tickStyle={styles.tickStyle}
      wrapperStyle={{
        left: [styles.wrapperCommonStyle, styles.wrapperStyleLeft],
        right: [styles.wrapperCommonStyle, styles.wrapperStyleRight],
      }}
      onLongPress={onLongPress}
    />
  )
}

export default Bubble
