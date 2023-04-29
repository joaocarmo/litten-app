/* eslint-disable react/require-default-props */
import { FC, lazy, Suspense } from 'react'
import { Platform, View } from 'react-native'
import type { AlertButton, AlertStatic } from 'react-native'

export type CallbackOrButtons = Parameters<AlertStatic['prompt']>[2]

export type AlertStaticParameters = Parameters<AlertStatic['prompt']>

export type UIPromptProps = {
  callbackOrButtons?: AlertStaticParameters[2]
  cancelLabel: string
  confirmLabel: string
  defaultValue?: AlertStaticParameters[4]
  isDestructive?: boolean
  keyboardType?: AlertStaticParameters[5]
  message?: AlertStaticParameters[1]
  onCancel: ((text: string) => void) | AlertButton
  onConfirm: ((text: string) => void) | AlertButton
  open?: boolean
  title: AlertStaticParameters[0]
  type?: AlertStaticParameters[3]
}

const PromptComponent = lazy(() =>
  Platform.OS === 'ios' ? import('./prompt.ios') : import('./prompt.android'),
)

const Prompt: FC<UIPromptProps> = (props) => (
  <Suspense fallback={<View />}>
    <PromptComponent {...props} />
  </Suspense>
)

export default Prompt
