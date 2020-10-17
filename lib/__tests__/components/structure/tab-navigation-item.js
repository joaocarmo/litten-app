import TabNavigationItem from 'structure/tab-navigation-item'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "TabNavigationItem" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(<TabNavigationItem />).toJSON()
    expect(element).toMatchSnapshot()
  })
})
