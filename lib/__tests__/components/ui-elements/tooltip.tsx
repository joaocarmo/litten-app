import TestRenderer from 'react-test-renderer'
import ThemeProvider from '@components/theme/provider'
import { UITooltip } from '@ui-elements'

describe('Snapshot test for the "UITooltip" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <ThemeProvider>
        <UITooltip>Some text here</UITooltip>
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
