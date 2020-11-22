/**
 * @format
 */

import { UISwitch } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UISwitch" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <UISwitch value={true}>Some text here</UISwitch>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
