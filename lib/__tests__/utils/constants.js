/**
 * @format
 */

import * as constants from 'utils/constants'

describe('Tests the existence of the project constants', () => {
  for (const [key, value] of Object.entries(constants)) {
    it(`${key} 'exists and is truthy`, () => {
      expect(`${value}`).toBeTruthy()
    })
  }
})
