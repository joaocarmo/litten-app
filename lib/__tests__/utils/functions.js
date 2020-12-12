/**
 * @format
 */

import {
  appendOrReplace,
  buildShareURI,
  convertLength,
  createAuthHeader,
  degToRad,
  distanceBetween,
  getErrorMessage,
  getFromListByKey,
  getImagePath,
  getLocationType,
  getNumOfActiveFilters,
  getUnit,
  isValidLocation,
  iterateTimes,
  littenToHeaderTitle,
  mapCountriesToSelector,
  mapGoogleLocationKeys,
  parseAvatar,
  parseGoogleMapResponse,
  prepareReportMessage,
  shortenName,
  stringifyLocation,
} from 'utils/functions'
import {
  LITTEN_FILTER_LOCATION_RADIUS_MAX,
  LITTEN_FILTER_LOCATION_RADIUS_MIN,
  MEASURE_KM,
  MEASURE_MI,
  LNG_DEGREES_PER_KM,
} from 'utils/constants'
import reverseGeocodingResponse from './responses/reverse-geocoding-response'

const getRandInt = (min, max) => Math.floor(Math.random() * (max - min) + min)

describe('Test the "convertLength" function', () => {
  it(`returns the same value in '${MEASURE_KM}' by default or if using metric units`, () => {
    const value1 = getRandInt(
      LITTEN_FILTER_LOCATION_RADIUS_MIN,
      LITTEN_FILTER_LOCATION_RADIUS_MAX,
    )
    expect(convertLength(value1)).toEqual(value1)
    const value2 = getRandInt(
      LITTEN_FILTER_LOCATION_RADIUS_MIN,
      LITTEN_FILTER_LOCATION_RADIUS_MAX,
    )
    expect(convertLength(value2, true)).toEqual(value2)
  })

  it(`returns '0' only if exactly '0'`, () => {
    expect(convertLength(0, true)).toEqual(0)
    expect(convertLength(0, false)).toEqual(0)
    expect(convertLength(0.1, true)).toEqual(1)
    expect(convertLength(0.1, false)).toEqual(1)
  })

  it(`returns the value in '${MEASURE_MI}' if not using metric units`, () => {
    expect(convertLength(1, false)).toEqual(2)
    expect(convertLength(35, false)).toEqual(57)
    expect(convertLength(100, false)).toEqual(161)
  })
})

describe('Test the "getUnit" function', () => {
  it(`returns '${MEASURE_KM}' by default or if using metric units`, () => {
    expect(getUnit('length')).toEqual(MEASURE_KM)
    expect(getUnit('length', true)).toEqual(MEASURE_KM)
  })

  it(`returns '${MEASURE_MI}' if not using metric units`, () => {
    expect(getUnit('length', false)).toEqual(MEASURE_MI)
  })
})

describe('Test the "iterateTimes" function', () => {
  it('returns an empty array for n < 0', () => {
    expect(iterateTimes(-1)).toEqual([])
  })
  it('returns an n-length iterable array from 1 to n', () => {
    const n = 7
    const value = iterateTimes(n)
    expect(value).toHaveLength(n)
    const [first] = value
    expect(first).toEqual(1)
    const last = value[n - 1]
    expect(last).toEqual(n)
  })
  it('returns an n-length iterable array from k to n + k - 1', () => {
    const n = 7
    const k = 9
    const value = iterateTimes(n, k)
    expect(value).toHaveLength(n)
    const [first] = value
    expect(first).toEqual(k)
    const last = value[n - 1]
    expect(last).toEqual(n + k - 1)
  })
})

describe('Test the "mapCountriesToSelector" function', () => {
  it('maps an object with structure A to another object structure B', () => {
    const objInput = {
      cca2: 'PT',
      name: {
        common: 'Portugal',
      },
    }
    const objOutput = {
      key: 'PT',
      label: 'Portugal',
      value: 'PT',
    }
    expect(mapCountriesToSelector(objInput)).toEqual(objOutput)
  })
})

describe('Test the "getErrorMessage" function', () => {
  it('returns a string error message', () => {
    const defaultValue = 'Unknown error'
    expect(getErrorMessage('thisShouldNotExist')).toEqual(defaultValue)
  })
})

describe('Test the "parseAvatar" function', () => {
  it('returns null is there if no input and no email', () => {
    expect(parseAvatar()).toBe('')
  })
  it('returns a gravatar URI if no input, but an email exists', () => {
    const email = 'someone@domain.com'
    const size = 128
    const gravatarUri =
      'https://s.gravatar.com/avatar/6262634de06c42c0acf4bb41bc787608?s=128&d=mp'
    expect(parseAvatar(null, { email, size })).toBe(gravatarUri)
  })
  it('returns the passed URI if valid', () => {
    const value = 'https://hostname/files/image.jpg'
    expect(parseAvatar(value)).toBe(value)
  })
})

describe('Test the "isValidLocation" function', () => {
  it('evaluates a location object', () => {
    expect(isValidLocation()).toBe(false)
    expect(isValidLocation({})).toBe(false)
    expect(isValidLocation({ key: 'value' })).toBe(false)
    expect(isValidLocation({ country: 'value' })).toBe(false)
    expect(isValidLocation({ country: 'PT' })).toBe(false)
    expect(
      isValidLocation({
        country: '',
        administrativeArea1: '',
        administrativeArea2: '',
        administrativeArea3: '',
        administrativeArea4: '',
        administrativeArea5: '',
        administrativeArea6: '',
        street: '',
      }),
    ).toBe(false)
    expect(
      isValidLocation({
        country: 'value',
        administrativeArea1: 'value',
        administrativeArea2: 'value',
        administrativeArea3: 'value',
        administrativeArea4: 'value',
        administrativeArea5: 'value',
        administrativeArea6: 'value',
        street: 'value',
      }),
    ).toBe(false)
    expect(
      isValidLocation({
        country: 'PT',
        administrativeArea1: 'value',
        administrativeArea2: '',
        administrativeArea3: '',
        administrativeArea4: '',
        administrativeArea5: '',
        administrativeArea6: '',
        street: '',
      }),
    ).toBe(false)
    expect(
      isValidLocation({
        country: 'PT',
        administrativeArea1: 'value',
        administrativeArea2: 'value',
        administrativeArea3: '',
        administrativeArea4: '',
        administrativeArea5: '',
        administrativeArea6: '',
        street: '',
      }),
    ).toBe(true)
    expect(
      isValidLocation({
        country: 'PT',
        administrativeArea1: 'value',
        administrativeArea2: 'value',
        administrativeArea3: 'value',
        administrativeArea4: 'value',
        administrativeArea5: 'value',
        administrativeArea6: 'value',
        street: 'value',
      }),
    ).toBe(true)
  })

  describe('Test the "getLocationType" function', () => {
    const whitelisted = 'whitelisted'
    it('returns the best string from an array', () => {
      expect(getLocationType()).toEqual('unknown')
      expect(getLocationType([])).toEqual('unknown')
      expect(getLocationType(['political'])).toEqual('unknown')
      expect(getLocationType([whitelisted, 'political'])).toEqual(whitelisted)
      expect(getLocationType(['political', whitelisted])).toEqual(whitelisted)
    })
  })

  describe('Test the "parseGoogleMapResponse" function', () => {
    const { results } = reverseGeocodingResponse
    const [result] = results
    const shortResult = {
      street_number: '279',
      route: 'Bedford Ave',
      neighborhood: 'Williamsburg',
      sublocality: 'Brooklyn',
      administrative_area_level_2: 'Kings County',
      administrative_area_level_1: 'NY',
      country: 'US',
      postal_code: '11211',
    }
    const longResult = {
      street_number: '279',
      route: 'Bedford Avenue',
      neighborhood: 'Williamsburg',
      sublocality: 'Brooklyn',
      administrative_area_level_2: 'Kings County',
      administrative_area_level_1: 'New York',
      country: 'United States',
      postal_code: '11211',
    }

    it('returns a key-value map of the response', () => {
      expect(parseGoogleMapResponse()).toEqual({})
      expect(parseGoogleMapResponse(result)).toEqual(shortResult)
      expect(parseGoogleMapResponse(result, true)).toEqual(longResult)
    })
  })
})

describe('Test the "mapGoogleLocationKeys" function', () => {
  it("maps Google's keys to Litten's keys", () => {
    const keyMap = {
      administrative_area_level_1: 'administrativeArea1',
      administrative_area_level_2: 'administrativeArea2',
      country: 'country',
      establishment: 'establishment',
      locality: 'administrativeArea5',
      neighborhood: 'administrativeArea6',
      postal_code: 'postalCode',
      route: 'street',
      street_number: 'streetNumber',
      sublocality_level_1: 'administrativeArea6',
      sublocality: 'administrativeArea6',
    }

    const mapped = mapGoogleLocationKeys(keyMap)

    expect(typeof mapped).toBe('object')

    Object.values(keyMap).forEach((key) => {
      expect(mapped).toHaveProperty(key)
    })
  })
})

describe('Test the "appendOrReplace" function', () => {
  it('returns an string from a call without arguments', () => {
    expect(appendOrReplace()).toEqual('')
  })

  it('returns the same string without extra arguments', () => {
    expect(appendOrReplace('string')).toEqual('string')
  })

  it('returns a concatenated string of 2 inputs', () => {
    expect(appendOrReplace('string1', 'string2')).toEqual('string1string2')
  })

  it('returns a concatenated string of 2 inputs with a prefix on the second', () => {
    expect(appendOrReplace('string1', 'string2', { prefix: 'prefix' })).toEqual(
      'string1prefixstring2',
    )
  })

  it('returns a concatenated string of 2 inputs with a suffix on the second', () => {
    expect(appendOrReplace('string1', 'string2', { suffix: 'suffix' })).toEqual(
      'string1string2suffix',
    )
  })

  it('returns a concatenated string of 2 inputs with a prefix and a suffix on the second', () => {
    expect(
      appendOrReplace('string1', 'string2', {
        prefix: 'prefix',
        suffix: 'suffix',
      }),
    ).toEqual('string1prefixstring2suffix')
  })
})

describe('Test the "stringifyLocation" function', () => {
  const locationObject = {
    country: 'PT',
    administrativeArea1: 'administrativeArea1',
    administrativeArea2: 'administrativeArea2',
    administrativeArea3: 'administrativeArea3',
    administrativeArea4: 'administrativeArea4',
    administrativeArea5: 'administrativeArea5',
    administrativeArea6: 'administrativeArea6',
    street: 'street',
  }

  const locationString =
    'administrativeArea5 (administrativeArea4), administrativeArea2, administrativeArea1, PT'

  it('returns a human readable location string', () => {
    expect(stringifyLocation(locationObject)).toEqual(locationString)
  })
})

describe('Test the "degToRad" function', () => {
  const PI = Math.PI
  const conversionTable = [
    [0, 0],
    [30, PI / 6],
    [45, PI / 4],
    [60, PI / 3],
    [90, PI / 2],
    [120, (2 * PI) / 3],
    [135, (3 * PI) / 4],
    [150, (5 * PI) / 6],
    [180, PI],
    [270, (3 * PI) / 2],
    [360, 2 * PI],
  ]
  it.each(conversionTable)(
    'Converts %i degrees to %f radians',
    (degrees, radians) => {
      expect(degToRad(degrees)).toBe(radians)
    },
  )
})

describe('Test the "distanceBetween" function', () => {
  const coordinates = [
    [{ latitude: 0, longitude: 0 }, { latitude: 0, longitude: 0 }, 0],
    [{ latitude: 1, longitude: 1 }, { latitude: 1, longitude: 1 }, 0],
    [
      { latitude: 0, longitude: 0 },
      { latitude: LNG_DEGREES_PER_KM, longitude: LNG_DEGREES_PER_KM },
      Math.sqrt(2),
    ],
    [
      { latitude: 90, longitude: -135 }, // North pole
      { latitude: -90, longitude: 45 }, // South pole
      20015, // Half the circumference of earth ( ~ 40 075 km / 2 )
    ],
    [
      { latitude: 40.7128, longitude: -74.006 }, // New York
      { latitude: 38.7223, longitude: -9.1393 }, // Lisbon
      5422, // ~ 5 419 km
    ],
    [
      { latitude: 41.1579, longitude: -8.6291 }, // Porto
      { latitude: 38.7223, longitude: -9.1393 }, // Lisbon
      274, // ~ 274 km
    ],
  ]
  it.each(coordinates)(
    'Calculates the minimum distance between two coordinates on Earth',
    (coordinatesA, coordinatesB, distance) => {
      expect(distanceBetween(coordinatesA, coordinatesB)).toBeCloseTo(
        distance,
        0,
      )
    },
  )
})

describe('Test the "getFromListByKey" function', () => {
  const list = [
    { key: 'bar' },
    { key: 'charlie' },
    { key: 'foo' },
    { key: 'foxtrot' },
  ]

  it('Retrieves a single object from an array of objects', () => {
    expect(getFromListByKey(list, list[0].key)).toEqual(list[0])
  })

  it('Returns nothing if there is not match', () => {
    expect(getFromListByKey(list, 'empty')).toBeUndefined()
  })
})

describe('Test the "shortenName" function', () => {
  it("Shortens a name to 'First Last'", () => {
    expect(shortenName('John')).toBe('John')
    expect(shortenName('John Doe')).toBe('John Doe')
    expect(shortenName('John F. Doe')).toBe('John Doe')
  })
})

describe('Test the "getImagePath" function', () => {
  it('Retrieves a single object from an array of objects', () => {
    const imageObj = { path: 'image/path.jpg' }
    expect(getImagePath(imageObj)).toEqual(imageObj.path)
  })
})

describe('Test the "prepareReportMessage" function', () => {
  it('Prepares a meaningful report message', () => {
    const chat = { id: 1 }
    const user = { id: 1 }
    const message = prepareReportMessage(chat, user)
    expect(typeof message === 'string').toBe(true)
    expect(message.length).toBeGreaterThan(0)
  })
})

describe('Test the "getNumOfActiveFilters" function', () => {
  it('Returns the number of active filters', () => {
    expect(
      getNumOfActiveFilters({
        littenSpecies: [],
        littenType: [],
        locationRadius: 0,
      }),
    ).toEqual(0)

    expect(
      getNumOfActiveFilters({
        littenSpecies: ['A'],
        littenType: [],
        locationRadius: 0,
      }),
    ).toEqual(1)

    expect(
      getNumOfActiveFilters({
        littenSpecies: ['A'],
        littenType: ['B'],
        locationRadius: 0,
      }),
    ).toEqual(2)

    expect(
      getNumOfActiveFilters({
        littenSpecies: ['A'],
        littenType: ['B'],
        locationRadius: 1,
      }),
    ).toEqual(3)
  })
})

describe('Test the "littenToHeaderTitle" function', () => {
  const removedTitle = 'Litten removed'

  it('Returns the removed message if the parameters are empty', () => {
    const litten = {
      species: '',
      type: '',
      title: '',
    }
    expect(littenToHeaderTitle(litten)).toEqual(removedTitle)
  })

  it('Returns the title if the parameters are not empty', () => {
    const litten = {
      species: 'A',
      type: 'B',
      title: 'C',
    }
    const title = littenToHeaderTitle(litten)
    expect(title).not.toEqual(removedTitle)
    expect(title.length).toBeGreaterThan(0)
  })
})

describe('Test the "buildShareURI" function', () => {
  it('Returns an empty string for an empty object', () => {
    expect(buildShareURI({})).toEqual('')
  })

  it('Returns an custom URI string for an object with a proper id', () => {
    const id = getRandInt(10000, 99999)
    expect(buildShareURI({ id }, false)).toEqual(`litten://litten/${id}`)
    expect(buildShareURI({ id }, true)).toEqual(
      `https://litten.app/open/litten/${id}`,
    )
  })
})

describe('Test the "createAuthHeader" function', () => {
  it('Returns an empty string for missing arguments', () => {
    expect(createAuthHeader()).toEqual('')
    expect(createAuthHeader('')).toEqual('')
    expect(createAuthHeader('', '')).toEqual('')
    expect(createAuthHeader('a', '')).toEqual('')
    expect(createAuthHeader('', 'b')).toEqual('')
  })

  it('Returns an properly encoded basic auth header', () => {
    const usr = 'fakeuser@fakedomain.com'
    const pwd = 'fakepassword'
    const encodedBasicAuth =
      'Basic ZmFrZXVzZXJAZmFrZWRvbWFpbi5jb206ZmFrZXBhc3N3b3Jk'
    expect(createAuthHeader(usr, pwd)).toEqual(encodedBasicAuth)
  })
})
