import React from 'react'
import { UIInput } from 'ui-elements'
import renderer from 'react-test-renderer'

describe('Snapshot test for the "UIInput" component', () => {
  it('renders correctly', () => {
    const element = renderer
      .create(<UIInput placeholder="Some text here" />)
      .toJSON()
    expect(element).toMatchSnapshot()
  })
})
