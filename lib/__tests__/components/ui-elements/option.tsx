import { render } from '@utils/tests/react-native'
import { UIOption } from '@ui-elements'

describe('Snapshot test for the "UISwitch" component', () => {
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

  it('renders correctly without description', () => {
    const element = render(
      <UIOption
        items={items}
        label="Some text here"
        selectedValue={selectedValue}
      />,
    )

    expect(element.toJSON()).toMatchSnapshot()
  })

  it('renders correctly with description', () => {
    const element = render(
      <UIOption
        description="Some more text here"
        items={items}
        label="Some text here"
        selectedValue={selectedValue}
      />,
    )

    expect(element.toJSON()).toMatchSnapshot()
  })
})
