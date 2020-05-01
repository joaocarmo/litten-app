import {
  iterateTimes,
  mapCountriesToSelector,
  getErrorMessage,
  parseAvatar,
  logError,
} from 'utils/functions'

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
