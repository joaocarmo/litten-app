/**
 * @format
 */

import TestRenderer from 'react-test-renderer'
import ThemeProvider from 'components/theme/provider'
import { UIText } from 'ui-elements'

describe('Snapshot test for the "UIText" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <ThemeProvider>
        <UIText>Some text here</UIText>
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
