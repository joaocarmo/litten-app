/**
 * @format
 */

import { UIButton } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UIButton" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <UIButton>Some text here</UIButton>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
