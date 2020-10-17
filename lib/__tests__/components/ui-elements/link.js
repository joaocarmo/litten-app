import { UILink } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UILink" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <UILink>Some text here</UILink>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
