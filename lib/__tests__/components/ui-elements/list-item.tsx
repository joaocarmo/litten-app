import { render } from '@utils/tests/react-native'
import { UIListItem } from '@ui-elements'

describe('Snapshot test for the "UIText" component', () => {
  it('renders correctly', () => {
    const element = render(
      <UIListItem badgeNum={2} hasExtra>
        Some text here
      </UIListItem>,
    )

    expect(element.toJSON()).toMatchSnapshot()
  })
})
