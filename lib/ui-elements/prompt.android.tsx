import { useCallback, useState } from 'react'
import Dialog from 'react-native-dialog'
import { useTheme } from '@hooks'
import { translate } from '@utils/i18n'

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
}) => {
  const [inputText, setInputText] = useState(defaultValue)
  const {
    theme: { colors },
  } = useTheme()

  const secureTextEntry = type === 'secure-text'

  const handleOnPress = useCallback(() => {
    onConfirm(inputText)
  }, [inputText, onConfirm])

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
        onPress={handleOnPress}
        color={isDestructive ? colors.danger : undefined}
      />
    </Dialog.Container>
  )
}

export default UIPrompt
