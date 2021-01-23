/**
 * @format
 * @flow
 */

export type Coordinates = { latitude: number, longitude: number }

export type EmptyCoordinates = { latitude: null, longitude: null }
export type DBCoordinateObject = {
  latitude: number | null,
  longitude: number | null,
  _latitude?: number | null,
  _longitude?: number | null,
}

export type DBLocationObject = {
  country: string,
  administrativeArea1: string,
  administrativeArea2: string,
  administrativeArea3: string,
  administrativeArea4: string,
  administrativeArea5: string,
  administrativeArea6: string,
  street: string,
  coordinates: DBCoordinateObject,
}

export const locationSchema: DBLocationObject = {
  // country
  country: '',
  // autonomous region / state
  administrativeArea1: '',
  // region / county
  administrativeArea2: '',
  // sub-region
  administrativeArea3: '',
  // minicipality / metropolitan area
  administrativeArea4: '',
  // city / locality
  administrativeArea5: '',
  // civil parish / neighborhood / sublocality
  administrativeArea6: '',
  // street
  street: '',
  // geographic coordinates
  coordinates: {
    latitude: null,
    longitude: null,
  },
}
