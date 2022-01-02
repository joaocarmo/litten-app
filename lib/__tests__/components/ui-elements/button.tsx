import { render } from '@utils/tests/react-native'
import { UIButton } from '@ui-elements'

describe('Snapshot test for the "UIButton" component', () => {
  it('renders correctly', () => {
    const element = render(<UIButton>Some text here</UIButton>)

    expect(element.toJSON()).toMatchSnapshot()
  })
})
