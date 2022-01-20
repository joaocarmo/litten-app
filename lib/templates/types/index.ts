import type { ComponentType } from 'react'

export type Tab = {
  component?: ComponentType<any>
  compoundComponent?: ComponentType<any>
  key: string
  name: string
  scrollable?: boolean
  title?: string
}
