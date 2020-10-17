/**
 * @format
 */

import App from '../App'
// Note: test renderer must be required after react-native
import TestRenderer from 'react-test-renderer'

describe('Mount the app as a whole', () => {
  it('renders correctly', () => {
    TestRenderer.create(<App />)
  })
})
