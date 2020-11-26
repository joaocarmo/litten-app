/**
 * @format
 * @flow
 */

import { useState } from 'react'
import { Alert, Platform } from 'react-native'
import Dialog from 'react-native-dialog'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const UIPrompt: (args: any) => React$Node = ({
  open = false,
  title,
  message,
  type,
  cancelLabel,
  onCancel,
  confirmLabel,
  onConfirm,
  isDestructive = false,
  defaultValue = '',
  keyboardType,
}) => {
  const [inputText, setInputText] = useState(defaultValue)

  const secureTextEntry = type === 'secure-text'

  if (!open) {
    return null
  }

  if (Platform.OS === 'ios') {
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

  return (
    <Dialog.Container visible={open}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Description>{message}</Dialog.Description>
      <Dialog.Input
        autoFocus
        onChangeText={setInputText}
        placeholder={secureTextEntry ? translate('cta.password') : ''}
        secureTextEntry={secureTextEntry}
      />
      <Dialog.Button label={cancelLabel} onPress={onCancel} />
      <Dialog.Button
        label={confirmLabel}
        onPress={() => onConfirm(inputText)}
        color={isDestructive ? colors.red : undefined}
      />
    </Dialog.Container>
  )
}

export default UIPrompt
