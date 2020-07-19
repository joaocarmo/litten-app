import {
  notNothing,
  minLength,
  mustMatch,
  validEmail,
  validPhoneNumber,
} from '../../utils/validators'

describe('Test the "notNothing" validator', () => {
  const validator = notNothing()

  it('returns "true" if the value is truthy', () => {
    expect(validator('string')).toBe(true)
  })

  it('returns "false" if the value is falsy', () => {
    expect(validator()).toBe(false)
  })
})

describe('Test the "minLength" validator', () => {
  const K = 11
  const validator = minLength(K)

  it(`returns "true" if the value has length greater than or equal to ${K}`, () => {
    expect(validator('should have enough length')).toBe(true)
  })

  it(`returns "false" if the value has length less than ${K}`, () => {
    expect(validator('should not')).toBe(false)
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
