import React from 'react'
import { UIContainer } from 'ui-elements'
import renderer from 'react-test-renderer'

describe('Snapshot test for the "UIContainer" component', () => {
  it('renders correctly', () => {
    const element = renderer
      .create(<UIContainer>Some text here</UIContainer>)
      .toJSON()
    expect(element).toMatchSnapshot()
  })
})
