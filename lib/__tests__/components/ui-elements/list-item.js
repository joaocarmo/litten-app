/**
 * @format
 */

import { UIListItem } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UIText" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <UIListItem badgeNum={2} hasExtra>
        Some text here
      </UIListItem>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
