import React from 'react'
import { UISearch } from 'ui-elements'
import renderer from 'react-test-renderer'

describe('Snapshot test for the "UISearch" component', () => {
  it('renders correctly', () => {
    const element = renderer.create(<UISearch placeholder="Search" />).toJSON()
    expect(element).toMatchSnapshot()
  })
})
