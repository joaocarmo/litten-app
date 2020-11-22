/**
 * @format
 */

import { UIBaloon } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UIBaloon" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <UIBaloon type="info">Some text here</UIBaloon>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
