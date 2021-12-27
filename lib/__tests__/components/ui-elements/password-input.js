/**
 * @format
 */

import TestRenderer from 'react-test-renderer'
import ThemeProvider from 'components/theme/provider'
import { UIPasswordInput } from 'ui-elements'

describe('Snapshot test for the "UIPasswordInput" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <ThemeProvider>
        <UIPasswordInput placeholder="Some text here" />
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
