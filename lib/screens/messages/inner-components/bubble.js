/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import type { Node } from 'react'
import { StyleSheet } from 'react-native'
import { useActionSheet } from '@expo/react-native-action-sheet'
import Clipboard from '@react-native-community/clipboard'
import { Bubble as GCBubble } from 'react-native-gifted-chat'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'
import { fontWeight } from 'styles/typography'

const Bubble: (args: any) => Node = (props) => {
  const { showActionSheetWithOptions } = useActionSheet()

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

const styles = StyleSheet.create({
  tickStyle: {
    color: colors.darkGray,
  },
  textStyle: {
    fontWeight: fontWeight.lighter,
    color: colors.black,
  },
  wrapperCommonStyle: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.gray,
    marginTop: 1,
    marginBottom: 1,
  },
  wrapperStyleLeft: {
    backgroundColor: colors.white,
  },
  wrapperStyleRight: {
    backgroundColor: `${colors.blue}10`,
  },
})

export default Bubble
