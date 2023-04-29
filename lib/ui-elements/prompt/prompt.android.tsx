import { useCallback, useState } from 'react'
import Dialog from 'react-native-dialog'
import { useTheme } from '@hooks'
import { translate } from '@utils/i18n'
import type { UIPromptProps } from '@ui-elements/prompt'

const UIPrompt = ({
  cancelLabel,
  confirmLabel,
  defaultValue = '',
  isDestructive = false,
  message,
  onCancel,
  onConfirm,
  open = false,
  title,
  type,
}: UIPromptProps) => {
  const [inputText, setInputText] = useState(defaultValue)
  const {
    theme: { colors },
  } = useTheme()

  const secureTextEntry = type === 'secure-text'

  const handleOnPress = useCallback(() => {
    if (typeof onConfirm === 'function') {
      onConfirm(inputText)
    }
  }, [inputText, onConfirm])

  const handleOnCancel = useCallback(() => {
    if (typeof onCancel === 'function') {
      onCancel(inputText)
    }
  }, [inputText, onCancel])

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
      <Dialog.Button label={cancelLabel} onPress={handleOnCancel} />
      <Dialog.Button
        label={confirmLabel}
        onPress={handleOnPress}
        color={isDestructive ? colors.danger : undefined}
      />
    </Dialog.Container>
  )
}

UIPrompt.defaultProps = {
  defaultValue: '',
  isDestructive: false,
  open: false,
}

export default UIPrompt
