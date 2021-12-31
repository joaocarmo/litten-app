import { render } from '@testing-library/react-native'
import App from '../App'

describe('Mount the app as a whole', () => {
  it('mounts correctly', () => {
    const screen = render(<App />)

    expect(screen.toJSON()).toBeNull()
  })
})
