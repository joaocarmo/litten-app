import { render } from '@utils/tests/react-native'
import { UIIcon } from '@ui-elements'

describe('Snapshot test for the "UIText" component', () => {
  it('renders correctly', () => {
    const element = render(<UIIcon icon="mockIcon" circle />)

    expect(element.toJSON()).toMatchSnapshot()
  })
})
