import { render } from '@testing-library/react-native'
import App from '../App'

describe('Mount the app as a whole', () => {
  jest.useFakeTimers()

  it('mounts correctly', () => {
    const screen = render(<App />)

    jest.runAllTimers()

    expect(screen.toJSON()).toBeNull()
  })
})
