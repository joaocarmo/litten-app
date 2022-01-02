import { render } from '@utils/tests/react-native'
import { UIImage } from '@ui-elements'

const imgPlaceholder = 'https://placeimg.com/140/140/people'
describe('Snapshot test for the "UIImage" component', () => {
  it('renders correctly', () => {
    const element = render(<UIImage source={imgPlaceholder} />)

    expect(element.toJSON()).toMatchSnapshot()
  })
})
