/**
 * @format
 */

import { UIIcon } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UIText" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <UIIcon icon={{ uri: '' }} elevated circle />,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
