import React from 'react'
import { UIPasswordInput } from 'ui-elements'
import renderer from 'react-test-renderer'

describe('Snapshot test for the "UIPasswordInput" component', () => {
  it('renders correctly', () => {
    const element = renderer
      .create(<UIPasswordInput placeholder="Some text here" />)
      .toJSON()
    expect(element).toMatchSnapshot()
  })
})
