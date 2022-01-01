import { translate } from '@utils/i18n'

describe('Test the i18n helpers', () => {
  const testKeys = ['', 'cta.yes', 'thisShouldNotExist']
  it('always returns a string', () => {
    for (const key of testKeys) {
      const value = translate(key)
      expect(typeof value).toBe('string')
      expect(value.length > 0).toBe(true)
    }
  })
  it('returns a default value if the key is missing', () => {
    const defaultValue = 'defaultValue'
    const value = translate('thisShouldNotExist', {
      defaultValue,
    })
    expect(typeof value).toBe('string')
    expect(value.length > 0).toBe(true)
    expect(value).toBe(defaultValue)
  })
})
