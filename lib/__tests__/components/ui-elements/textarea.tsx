import { render } from '@utils/tests/react-native'
import { UITextArea } from '@ui-elements'

describe('Snapshot test for the "UITextArea" component', () => {
  it('renders correctly', () => {
    const element = render(<UITextArea rows={4}>Some text here</UITextArea>)

    expect(element.toJSON()).toMatchSnapshot()
  })
})
