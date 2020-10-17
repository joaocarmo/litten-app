import { UIContainer } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UIContainer" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <UIContainer>Some text here</UIContainer>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
