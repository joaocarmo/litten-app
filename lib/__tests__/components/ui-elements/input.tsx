import { render } from '@utils/tests/react-native'
import { UIInput } from '@ui-elements'

describe('Snapshot test for the "UIInput" component', () => {
  it('renders correctly', () => {
    const element = render(<UIInput placeholder="Some text here" />)

    expect(element.toJSON()).toMatchSnapshot()
  })
})
