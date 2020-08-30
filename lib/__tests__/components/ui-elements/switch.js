import React from 'react'
import { UISwitch } from 'ui-elements'
import renderer from 'react-test-renderer'

describe('Snapshot test for the "UISwitch" component', () => {
  it('renders correctly', () => {
    const element = renderer
      .create(<UISwitch value={true}>Some text here</UISwitch>)
      .toJSON()
    expect(element).toMatchSnapshot()
  })
})
