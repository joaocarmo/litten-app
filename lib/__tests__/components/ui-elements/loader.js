import React from 'react'
import { UILoader } from 'ui-elements'
import renderer from 'react-test-renderer'

describe('Snapshot test for the "UILoader" component', () => {
  it('renders null when inactive', () => {
    const element = renderer.create(<UILoader active={false} />).toJSON()
    expect(element).toBeNull()
  })

  it('renders correctly when active', () => {
    const element = renderer.create(<UILoader active />).toJSON()
    expect(element).toMatchSnapshot()
  })
})
