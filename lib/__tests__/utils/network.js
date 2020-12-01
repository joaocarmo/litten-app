/**
 * @format
 */

import {
  getExternalGeoInformation,
  getGeoInformation,
  getReverseGeoInformation,
  submitUserFeedback,
} from 'utils/network'
import geocodingResponse from './responses/geocoding-response'
import reverseGeocodingResponse from './responses/reverse-geocoding-response'

describe('Test the external network requests', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('finds geolocation information based on the IP address', async () => {
    const expectedKeys = [
      'ip',
      'country_code',
      'country_name',
      'region_code',
      'region_name',
      'city',
      'zip_code',
      'time_zone',
      'latitude',
      'longitude',
      'metro_code',
    ]

    const objectResponse = {}
    expectedKeys.forEach((key) => {
      objectResponse[key] = ''
    })

    fetch.mockResponse(JSON.stringify(objectResponse))

    const data = await getExternalGeoInformation()
    const K = Object.keys(data).length

    expect.assertions(K + 1)

    expect(data).toBeInstanceOf(Object)

    if (K > 0) {
      for (const key of expectedKeys) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(data).toHaveProperty(key)
      }
    }
  })

  it('finds the coordinates based on an address', async () => {
    const expectedKeys = ['geometry']

    const address = '1600 Amphitheatre Parkway, Mountain View, CA'

    fetch.mockResponse(JSON.stringify(geocodingResponse))

    const response = await getGeoInformation(address)

    expect(response).toBeInstanceOf(Array)

    const [data] = response

    expect(data).toBeInstanceOf(Object)

    for (const key of expectedKeys) {
      expect(data).toHaveProperty(key)
    }
  })

  it('finds the address based on coordinates', async () => {
    const expectedKeys = ['address_components']

    const coordinates = {
      latitude: 40.714224,
      longitude: -73.961452,
    }

    fetch.mockResponse(JSON.stringify(reverseGeocodingResponse))

    const response = await getReverseGeoInformation(coordinates)

    expect(response).toBeInstanceOf(Array)

    const [data] = response

    expect(data).toBeInstanceOf(Object)

    for (const key of expectedKeys) {
      expect(data).toHaveProperty(key)
    }
  })

  it('submits the user feedback and returns the status', async () => {
    const result = await submitUserFeedback('type', 'message')

    expect(typeof result === 'boolean').toBe(true)
  })
})
