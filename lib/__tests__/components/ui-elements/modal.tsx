import { render } from '@utils/tests/react-native'
import { UIModal, UIText } from '@ui-elements'

describe('Snapshot test for the "UIModal" component', () => {
  it('renders correctly', () => {
    const element = render(
      <UIModal visible>
        <UIText>Some text here</UIText>
      </UIModal>,
    )

    expect(element.toJSON()).toMatchSnapshot()
  })
})
