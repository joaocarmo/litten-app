import { debugLog, logError } from '@utils/dev'

describe('Test the "debugLog" function', () => {
  it('returns a string error message', () => {
    expect(debugLog('arguments')).toBeUndefined()
  })
})
describe('Test the "logError" function', () => {
  it('returns a string error message', () => {
    expect(logError('arguments')).toBeUndefined()
  })
})
