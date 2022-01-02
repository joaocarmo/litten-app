import { render } from '@utils/tests/react-native'
import { UILink } from '@ui-elements'

describe('Snapshot test for the "UILink" component', () => {
  it('renders correctly', () => {
    const element = render(<UILink>Some text here</UILink>)

    expect(element.toJSON()).toMatchSnapshot()
  })
})
