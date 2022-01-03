import { render } from '@utils/tests/react-native'
import { UIAvatar } from '@ui-elements'

const imgPlaceholder = 'https://placeimg.com/140/140/people'

describe('Snapshot test for the "UIText" component', () => {
  it('renders correctly', () => {
    const element = render(
      <UIAvatar
        source={{
          uri: imgPlaceholder,
        }}
      />,
    )

    expect(element.toJSON()).toMatchSnapshot()
  })
})
