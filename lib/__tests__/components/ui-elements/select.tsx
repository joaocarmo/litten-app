import { render } from '@utils/tests/react-native'
import { UISelect } from '@ui-elements'

describe('Snapshot test for the "UISelect" component', () => {
  it('renders correctly', () => {
    const items = [
      {
        key: 'one',
        label: 'One',
        value: 'one',
      },
      {
        key: 'two',
        label: 'Two',
        value: 'two',
      },
    ]
    const selectedValue = 'one'
    const element = render(
      <UISelect
        placeholder="Some text here"
        items={items}
        selectedValue={selectedValue}
      />,
    )

    expect(element.toJSON()).toMatchSnapshot()
  })
})
