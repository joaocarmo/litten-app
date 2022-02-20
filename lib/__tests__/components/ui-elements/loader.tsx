import { render } from '@utils/tests/react-native'
import { UILoader } from '@ui-elements'

describe('Snapshot test for the "UILoader" component', () => {
  it('renders null when inactive', () => {
    const element = render(<UILoader active={false} />)

    expect(element.toJSON()).toBeNull()
  })

  it('renders correctly when active', () => {
    const element = render(<UILoader active />)

    expect(element.toJSON()).toMatchSnapshot()
  })
})
