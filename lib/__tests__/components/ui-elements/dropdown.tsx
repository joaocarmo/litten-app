import { render } from '@utils/tests/react-native'
import { UIDropdown } from '@ui-elements'

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
    const element = render(
      <UIDropdown
        options={messageOptions}
        selectedValue="all"
        placement="bottom"
      />,
    )

    expect(element.toJSON()).toMatchSnapshot()
  })
})
