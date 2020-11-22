/**
 * @format
 */

import { UISeparator } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UISeparator" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(<UISeparator />).toJSON()
    expect(element).toMatchSnapshot()
  })
})
