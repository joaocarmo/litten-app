export type GLocation = {
  administrative_area_level_1: string
  administrative_area_level_2: string
  country: string
  establishment: string
  locality: string
  neighborhood: string
  postal_code: string
  route: string
  street_number: string
  sublocality_level_1: string
  sublocality: string
}

export type GLocationParsed = {
  country: string
  administrativeArea1: string
  administrativeArea2: string
  administrativeArea4: string
  administrativeArea5: string
  administrativeArea6: string
}

export type GResponseAddressComponent = {
  long_name: string
  short_name: string
  types: string[]
}

export type GResponse = {
  address_components: GResponseAddressComponent[]
  formatted_address: string
  geometry: Record<string, unknown>
  place_id: string
  plus_code: Record<string, unknown>
  types: string[]
}
