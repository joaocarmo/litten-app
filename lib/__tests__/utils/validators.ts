import {
  isPartOfList,
  minLength,
  mustMatch,
  notNothing,
  validEmail,
  validPhoneNumber,
} from '../../utils/validators'

describe('Test the "isPartOfList" validator', () => {
  const simpleList = [1, 2, 3, 4, 5, 6]
  const simpleValidator = isPartOfList(simpleList, (item) => item)
  const objectList = [
    {
      key: 1,
    },
    {
      key: 2,
    },
    {
      key: 3,
    },
    {
      key: 4,
    },
    {
      key: 5,
    },
    {
      key: 6,
    },
  ]

  const objectValidator = isPartOfList(objectList)

  it('returns "true" if the value is in the simple list', () => {
    expect(simpleValidator(1)).toBe(true)
  })

  it('returns "false" if the value is not in the simple list', () => {
    expect(simpleValidator(7)).toBe(false)
  })

  it('returns "true" if the value is in the object list', () => {
    expect(objectValidator(1)).toBe(true)
  })

  it('returns "false" if the value is not in the object list', () => {
    expect(objectValidator(7)).toBe(false)
  })
})

describe('Test the "notNothing" validator', () => {
  const validator = notNothing()

  it('returns "true" if the value is truthy', () => {
    expect(validator('string')).toBe(true)
  })

  it('returns "false" if the value is falsy', () => {
    expect(validator(undefined)).toBe(false)
  })
})

describe('Test the "minLength" validator', () => {
  const K = 11
  const validator = minLength(K)

  it(`returns "true" if the string has length greater than or equal to ${K}`, () => {
    expect(validator('should have enough length')).toBe(true)
  })

  it(`returns "true" if the array has length greater than or equal to ${K}`, () => {
    expect(validator([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])).toBe(true)
  })

  it(`returns "false" if the string has length less than ${K}`, () => {
    expect(validator('should not')).toBe(false)
  })

  it(`returns "false" if the array has length less than ${K}`, () => {
    expect(validator([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(false)
  })
})

describe('Test the "mustMatch" validator', () => {
  const value = 'string'
  const validator = mustMatch(value)

  it(`returns "true" if the value matches "${value}"`, () => {
    expect(validator(value)).toBe(true)
  })

  it(`returns "false" if the value does not match "${value}"`, () => {
    expect(validator('value')).toBe(false)
  })
})

describe('Test the "validEmail" validator', () => {
  const validator = validEmail()

  it('returns "true" if the value is a valid email', () => {
    expect(validator('name@domain.tld')).toBe(true)
  })

  it('returns "false" if the value is not a valid email', () => {
    expect(validator('definitely not a valid email')).toBe(false)
  })
})

describe('Test the "validPhoneNumber" validator', () => {
  const country = 'PT'
  const callingCode = '+351'
  const validator = validPhoneNumber(country, callingCode)

  it('returns "true" if the value is a valid phone number', () => {
    expect(validator('923 465 284')).toBe(true)
  })

  it('returns "false" if the value is not a valid phone number', () => {
    expect(validator('string')).toBe(false)
  })
})
