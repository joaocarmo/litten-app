/**
 * @format
 */

import { UIHeader } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UIHeader" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <UIHeader>Some text here</UIHeader>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
