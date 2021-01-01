/**
 * @format
 */

import { UIOption } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UISwitch" component', () => {
  it('renders correctly', () => {
    const items = [
      { key: 'one', label: 'One', value: 'one' },
      { key: 'two', label: 'Two', value: 'two' },
    ]
    const selectedValue = 'one'
    const element = TestRenderer.create(
      <UIOption
        items={items}
        label="Some text here"
        selectedValue={selectedValue}
      />,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
