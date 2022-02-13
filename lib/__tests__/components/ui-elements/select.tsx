import { render } from '@utils/tests/react-native'
import { UISelect } from '@ui-elements'

const handleOnChange = jest.fn()

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
        items={items}
        onChange={handleOnChange}
        placeholder="Some text here"
        selectedValue={selectedValue}
      />,
    )

    expect(element.toJSON()).toMatchSnapshot()
  })
})
