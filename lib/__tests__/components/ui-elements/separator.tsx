import { render } from '@utils/tests/react-native'
import { UISeparator } from '@ui-elements'

describe('Snapshot test for the "UISeparator" component', () => {
  it('renders correctly', () => {
    const element = render(<UISeparator />)

    expect(element.toJSON()).toMatchSnapshot()
  })
})
