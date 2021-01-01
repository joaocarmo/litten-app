/**
 * @format
 */

import { UIOption } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UISwitch" component', () => {
  const items = [
    { key: 'one', label: 'One', value: 'one' },
    { key: 'two', label: 'Two', value: 'two' },
  ]
  const selectedValue = 'one'

  it('renders correctly without description', () => {
    const element = TestRenderer.create(
      <UIOption
        items={items}
        label="Some text here"
        selectedValue={selectedValue}
      />,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })

  it('renders correctly with description', () => {
    const element = TestRenderer.create(
      <UIOption
        description="Some more text here"
        items={items}
        label="Some text here"
        selectedValue={selectedValue}
      />,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
