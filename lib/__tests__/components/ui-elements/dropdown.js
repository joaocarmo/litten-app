/**
 * @format
 */

import { UIDropdown } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

const messageOptions = [
  {
    key: 'all',
    label: 'All',
    value: 'all',
  },
  {
    key: 'read',
    label: 'Read',
    value: 'read',
  },
  {
    key: 'unread',
    label: 'Unread',
    value: 'unread',
  },
]

describe('Snapshot test for the "UIDropdown" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <UIDropdown
        options={messageOptions}
        selectedValue="all"
        placement="bottom"
      />,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
