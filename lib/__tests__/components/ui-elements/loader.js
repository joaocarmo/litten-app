/**
 * @format
 */

import { UILoader } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UILoader" component', () => {
  it('renders null when inactive', () => {
    const element = TestRenderer.create(<UILoader active={false} />).toJSON()
    expect(element).toBeNull()
  })

  it('renders correctly when active', () => {
    const element = TestRenderer.create(<UILoader active />).toJSON()
    expect(element).toMatchSnapshot()
  })
})
