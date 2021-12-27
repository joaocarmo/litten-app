/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import type { Node } from 'react'
import { StyleSheet } from 'react-native'
import { useTheme } from 'hooks'
import { useActionSheet } from '@expo/react-native-action-sheet'
import Clipboard from '@react-native-community/clipboard'
import { Bubble as GCBubble } from 'react-native-gifted-chat'
import { translate } from 'utils/i18n'

const Bubble: (args: any) => Node = (props) => {
  const { showActionSheetWithOptions } = useActionSheet()

  const { createStyles, typography } = useTheme()

  const styles = createStyles((theme) => ({
    tickStyle: {
      color: theme.colors.neutralDark,
    },
    textStyle: {
      fontWeight: typography.fontWeight.lighter,
      color: theme.colors.text,
    },
    wrapperCommonStyle: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.neutral,
      marginTop: 1,
      marginBottom: 1,
    },
    wrapperStyleLeft: {
      backgroundColor: theme.colors.background,
    },
    wrapperStyleRight: {
      backgroundColor: `${theme.colors.secondary}10`,
    },
  }))

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
