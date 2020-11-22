/**
 * @format
 */

import { UIInput } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UIInput" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <UIInput placeholder="Some text here" />,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
