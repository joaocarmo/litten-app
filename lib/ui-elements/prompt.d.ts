/* eslint-disable react/prefer-stateless-function */
// eslint-disable-next-line max-classes-per-file
import type { Component } from 'react'
import type {
  AlertButton,
  AlertStatic,
  Constructor,
  NativeMethodsMixin,
} from 'react-native'

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

declare class PromptComponent extends Component<UIPromptProps> {}

declare const PromptBase: Constructor<NativeMethodsMixin> &
  typeof PromptComponent

export default class Prompt extends PromptBase {}
