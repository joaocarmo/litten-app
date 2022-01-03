import { render } from '@utils/tests/react-native'
import { UIText } from '@ui-elements'

describe('Snapshot test for the "UIText" component', () => {
  it('renders correctly', () => {
    const element = render(<UIText>Some text here</UIText>)

    expect(element.toJSON()).toMatchSnapshot()
  })
})
