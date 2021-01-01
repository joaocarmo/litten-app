/**
 * @format
 */

import { UISwitch } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UISwitch" component', () => {
  it('renders correctly without description', () => {
    const element = TestRenderer.create(
      <UISwitch label="Some text here" value={true} />,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })

  it('renders correctly with description', () => {
    const element = TestRenderer.create(
      <UISwitch
        description="Some more text here"
        label="Some text here"
        value={true}
      />,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
