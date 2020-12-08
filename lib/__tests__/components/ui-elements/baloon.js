/**
 * @format
 */

import { UIBalloon } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UIBalloon" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <UIBalloon type="info">Some text here</UIBalloon>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
