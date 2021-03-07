/**
 * @format
 * @flow
 */

import { Alert } from 'react-native'

const UIPrompt: (args: any) => React$Node = ({
  cancelLabel,
  confirmLabel,
  defaultValue = '',
  isDestructive = false,
  keyboardType,
  message,
  onCancel,
  onConfirm,
  open = false,
  title,
  type,
}) => {
  if (!open) {
    return null
  }

  const callbackOrButtons = [
    {
      text: cancelLabel,
      onPress: onCancel,
      style: 'cancel',
    },
    {
      text: confirmLabel,
      onPress: onConfirm,
      style: isDestructive ? 'destructive' : 'default',
    },
  ]

  Alert.prompt(
    title,
    message,
    callbackOrButtons,
    type,
    defaultValue,
    keyboardType,
  )

  return null
}

export default UIPrompt
