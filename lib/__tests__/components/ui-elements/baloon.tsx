import { render } from '@utils/tests/react-native'
import { UIBalloon } from '@ui-elements'

describe('Snapshot test for the "UIBalloon" component', () => {
  it('renders correctly', () => {
    const element = render(<UIBalloon type="info">Some text here</UIBalloon>)

    expect(element.toJSON()).toMatchSnapshot()
  })
})
