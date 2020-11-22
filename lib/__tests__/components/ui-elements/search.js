/**
 * @format
 */

import { UISearch } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UISearch" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <UISearch placeholder="Search" />,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
