/**
 * @format
 */

import TestRenderer from 'react-test-renderer'
import ThemeProvider from 'components/theme/provider'
import { UIDropdown } from 'ui-elements'

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
      <ThemeProvider>
        <UIDropdown
          options={messageOptions}
          selectedValue="all"
          placement="bottom"
        />
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
