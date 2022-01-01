import { UIImage } from '@ui-elements'
import TestRenderer from 'react-test-renderer'

const imgPlaceholder = 'https://placeimg.com/140/140/people'
describe('Snapshot test for the "UIImage" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <UIImage source={imgPlaceholder} />,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
