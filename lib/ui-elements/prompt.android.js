/**
 * @format
 * @flow
 */

import { useState } from 'react'
import Dialog from 'react-native-dialog'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

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
  const [inputText, setInputText] = useState(defaultValue)

  const secureTextEntry = type === 'secure-text'

  if (!open) {
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
        autoCapitalize={secureTextEntry ? 'none' : undefined}
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
