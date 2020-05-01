import { getExternalGeoInformation } from 'utils/network'

describe('Test the external network requests', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

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

  it('finds geolocation information based on the IP address', async () => {
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
        expect(data).toHaveProperty(key)
      }
    }
  })
})
