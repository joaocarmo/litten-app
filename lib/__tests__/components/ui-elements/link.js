import React from 'react'
import { UILink } from 'ui-elements'
import renderer from 'react-test-renderer'

describe('Snapshot test for the "UILink" component', () => {
  it('renders correctly', () => {
    const element = renderer.create(<UILink>Some text here</UILink>).toJSON()
    expect(element).toMatchSnapshot()
  })
})
