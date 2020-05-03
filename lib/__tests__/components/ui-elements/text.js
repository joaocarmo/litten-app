import React from 'react'
import { UIText } from 'ui-elements'
import renderer from 'react-test-renderer'

describe('Snapshot test for the "UIText" component', () => {
  it('renders correctly', () => {
    const element = renderer.create(<UIText>Some text here</UIText>).toJSON()
    expect(element).toMatchSnapshot()
  })
})
