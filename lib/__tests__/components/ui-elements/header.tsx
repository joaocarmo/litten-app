import { render } from '@utils/tests/react-native'
import { UIHeader } from '@ui-elements'

describe('Snapshot test for the "UIHeader" component', () => {
  it('renders correctly', () => {
    const element = render(<UIHeader>Some text here</UIHeader>)

    expect(element.toJSON()).toMatchSnapshot()
  })
})
