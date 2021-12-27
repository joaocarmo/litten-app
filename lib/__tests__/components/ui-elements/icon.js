/**
 * @format
 */

import TestRenderer from 'react-test-renderer'
import ThemeProvider from 'components/theme/provider'
import { UIIcon } from 'ui-elements'

describe('Snapshot test for the "UIText" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <ThemeProvider>
        <UIIcon icon={{ uri: '' }} elevated circle />
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
