import { render } from '@utils/tests/react-native'
import { UISearch } from '@ui-elements'

describe('Snapshot test for the "UISearch" component', () => {
  it('renders correctly', () => {
    const element = render(<UISearch placeholder="Search" />)

    expect(element.toJSON()).toMatchSnapshot()
  })
})
