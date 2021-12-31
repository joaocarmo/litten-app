import colors from 'styles/colors'
describe('Test the style colors object', () => {
  it('should be a "[x: string]: string" type object', () => {
    expect(typeof colors).toBe('object')
    expect(Object.keys(colors).length > 0).toBe(true)

    for (const [key, value] of Object.entries(colors)) {
      expect(typeof key).toBe('string')
      expect(typeof value).toBe('string')
    }
  })
})
