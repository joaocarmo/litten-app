/**
 * @format
 */

import { UITooltip } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UITooltip" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <UITooltip>Some text here</UITooltip>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
