import TestRenderer from 'react-test-renderer'
import ThemeProvider from '@components/theme/provider'
import { UISearch } from '@ui-elements'

describe('Snapshot test for the "UISearch" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <ThemeProvider>
        <UISearch placeholder="Search" />
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
