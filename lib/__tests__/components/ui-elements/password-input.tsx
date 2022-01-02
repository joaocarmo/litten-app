import { render } from '@utils/tests/react-native'
import { UIPasswordInput } from '@ui-elements'

describe('Snapshot test for the "UIPasswordInput" component', () => {
  it('renders correctly', () => {
    const element = render(<UIPasswordInput placeholder="Some text here" />)

    expect(element.toJSON()).toMatchSnapshot()
  })
})
