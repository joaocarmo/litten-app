import { UISelect } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UISelect" component', () => {
  it('renders correctly', () => {
    const items = [
      { key: 'one', label: 'One', value: 'one' },
      { key: 'two', label: 'Two', value: 'two' },
    ]
    const selectedValue = 'one'
    const element = TestRenderer.create(
      <UISelect
        placeholder="Some text here"
        items={items}
        selectedValue={selectedValue}
      />,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
