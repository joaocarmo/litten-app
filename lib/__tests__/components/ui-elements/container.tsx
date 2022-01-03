import { render } from '@utils/tests/react-native'
import { UIContainer } from '@ui-elements'

describe('Snapshot test for the "UIContainer" component', () => {
  it('renders correctly', () => {
    const element = render(<UIContainer>Some text here</UIContainer>)

    expect(element.toJSON()).toMatchSnapshot()
  })
})
