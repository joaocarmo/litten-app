/**
 * @format
 */

import { UIModal, UIText } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UIModal" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <UIModal visible>
        <UIText>Some text here</UIText>
      </UIModal>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
