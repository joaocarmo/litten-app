import {
  iterateTimes,
  mapCountriesToSelector,
  getErrorMessage,
  parseAvatar,
  logError,
  rotate,
  isValidLocation,
  getLocationType,
  parseGoogleMapResponse,
  mapGoogleLocationKeys,
  appendOrReplace,
  stringifyLocation,
} from 'utils/functions'
import reverseGeocodingResponse from './responses/reverse-geocoding-response'

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
    expect(parseAvatar()).toBeNull()
  })
  it('returns a gravatar URI if no input, but an email exists', () => {
    const email = 'someone@domain.com'
    const gravatarUri =
      'https://s.gravatar.com/avatar/6262634de06c42c0acf4bb41bc787608?s=128&d=mp'
    expect(parseAvatar(null, { email })).toBe(gravatarUri)
  })
  it('returns the passed URI if valid', () => {
    const value = 'https://hostname/files/image.jpg'
    expect(parseAvatar(value)).toBe(value)
  })
})

describe('Test the "logError" function', () => {
  it('returns a string error message', () => {
    expect(logError('arguments')).toBeUndefined()
  })
})

describe('Test the "rotate" function', () => {
  it('returns a rotate object', () => {
    expect(rotate()).toEqual({ rotate: '0deg' })
    expect(rotate('45deg')).toEqual({ rotate: '45deg' })
    expect(rotate('90deg', 'z')).toEqual({ rotateZ: '90deg' })
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
