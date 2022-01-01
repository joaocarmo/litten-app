import type { ReactNode } from 'react'

export type BasicListOfThings = {
  key: string
  label: string
  [key: string]: unknown
}

export type BasicListOfAttributes = BasicListOfThings & {
  icon: string | ReactNode
  description: string
}

export type ListOfSpecies = BasicListOfAttributes & {
  labelOne?: string
}

export type ListOfTypes = BasicListOfAttributes

export type ListOfFilters = BasicListOfThings & {
  storeKey: string
}

export type ListOfContactOptions = BasicListOfThings & {
  icon: string | ReactNode
  urlScheme: string
  urlValueKey: string
}

export type ListOfReportTypes = BasicListOfThings & {
  emoji: string
  requestTypeId: number
}

export type ListOfUserTypes = BasicListOfThings & {
  value: string
}
