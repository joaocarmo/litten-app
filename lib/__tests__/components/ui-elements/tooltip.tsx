import { render } from '@utils/tests/react-native'
import { UITooltip } from '@ui-elements'

describe('Snapshot test for the "UITooltip" component', () => {
  it('renders correctly', () => {
    const element = render(<UITooltip>Some text here</UITooltip>)

    expect(element.toJSON()).toMatchSnapshot()
  })
})
