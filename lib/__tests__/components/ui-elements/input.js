/**
 * @format
 */

import TestRenderer from 'react-test-renderer'
import ThemeProvider from 'components/theme/provider'
import { UIInput } from 'ui-elements'

describe('Snapshot test for the "UIInput" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <ThemeProvider>
        <UIInput placeholder="Some text here" />
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
