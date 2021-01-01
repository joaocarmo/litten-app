/**
 * @format
 */

import { UISetting, UIText } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UISwitch" component', () => {
  it('renders correctly without description', () => {
    const element = TestRenderer.create(
      <UISetting label="Some text here">
        <UIText>Some more text here</UIText>
      </UISetting>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })

  it('renders correctly with description', () => {
    const element = TestRenderer.create(
      <UISetting description="Some description here" label="Some text here">
        <UIText>Some more text here</UIText>
      </UISetting>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
