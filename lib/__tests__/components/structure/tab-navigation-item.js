import React from 'react'
import TabNavigationItem from 'structure/tab-navigation-item'
import renderer from 'react-test-renderer'

describe('Snapshot test for the "TabNavigationItem" component', () => {
  it('renders correctly', () => {
    const element = renderer.create(<TabNavigationItem />).toJSON()
    expect(element).toMatchSnapshot()
  })
})
