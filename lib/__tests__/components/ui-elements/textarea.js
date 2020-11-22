/**
 * @format
 */

import { UITextArea } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UITextArea" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <UITextArea rows={4}>Some text here</UITextArea>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
