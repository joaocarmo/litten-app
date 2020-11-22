/**
 * @format
 */

import { UIPasswordInput } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UIPasswordInput" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <UIPasswordInput placeholder="Some text here" />,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
