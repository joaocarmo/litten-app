import type { ThemePreferences } from '@store/types'
import type { IconTypeComponent } from '@ui-elements/types'

export type BasicListOfThings = {
  key: string
  label: string
}

export type BasicListOfAttributes = BasicListOfThings & {
  icon: IconTypeComponent
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
  icon: IconTypeComponent
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

export type ListOfThemeOptions = BasicListOfThings & {
  value: ThemePreferences
}
