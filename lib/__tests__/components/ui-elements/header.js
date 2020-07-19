import React from 'react'
import { UIHeader } from 'ui-elements'
import renderer from 'react-test-renderer'

describe('Snapshot test for the "UIHeader" component', () => {
  it('renders correctly', () => {
    const element = renderer
      .create(<UIHeader>Some text here</UIHeader>)
      .toJSON()
    expect(element).toMatchSnapshot()
  })
})
