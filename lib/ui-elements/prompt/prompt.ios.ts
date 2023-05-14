import { useMemo } from 'react'
import { Alert } from 'react-native'
import type { CallbackOrButtons, UIPromptProps } from '@ui-elements/prompt'

const UIPrompt = ({
  cancelLabel,
  confirmLabel,
  defaultValue,
  isDestructive,
  keyboardType,
  message,
  onCancel,
  onConfirm,
  open,
  title,
  type,
}: UIPromptProps) => {
  const callbackOrButtons = useMemo(
    () =>
      [
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
      ] as CallbackOrButtons,
    [cancelLabel, confirmLabel, isDestructive, onCancel, onConfirm],
  )

  if (!open) {
    return null
  }

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

UIPrompt.defaultProps = {
  defaultValue: '',
  isDestructive: false,
  open: false,
}

export default UIPrompt
