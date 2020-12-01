/**
 * @format
 * @flow
 */

export type BasicListOfThings = {
  key: string,
  label: string,
  [key: string]: any,
}

export type BasicListOfAttributes = {
  ...BasicListOfThings,
  icon: string | React$Node,
  description: string,
}

export type ListOfSpecies = {
  ...BasicListOfAttributes,
  labelOne?: string,
}

export type ListOfTypes = {
  ...BasicListOfAttributes,
}

export type ListOfFilters = {
  ...BasicListOfThings,
  storeKey: string,
}

export type ListOfContactOptions = {
  ...BasicListOfThings,
  icon: string | React$Node,
  urlScheme: string,
  urlValueKey: string,
}

export type ListOfReportTypes = {
  ...BasicListOfThings,
}
