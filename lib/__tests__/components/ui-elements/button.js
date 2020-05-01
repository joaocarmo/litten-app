import React from 'react'
import { UIButton } from 'ui-elements'
import renderer from 'react-test-renderer'

describe('Snapshot test for the "UIButton" component', () => {
  it('renders correctly', () => {
    const element = renderer
      .create(<UIButton>Some text here</UIButton>)
      .toJSON()
    expect(element).toMatchSnapshot()
  })
})
