import { UIText } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UIText" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <UIText>Some text here</UIText>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
