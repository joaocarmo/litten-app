import React from 'react'
import { UISeparator } from 'ui-elements'
import renderer from 'react-test-renderer'

describe('Snapshot test for the "UISeparator" component', () => {
  it('renders correctly', () => {
    const element = renderer.create(<UISeparator />).toJSON()
    expect(element).toMatchSnapshot()
  })
})
