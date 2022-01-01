import TestRenderer from 'react-test-renderer'
import ThemeProvider from '@components/theme/provider'
import { UISeparator } from '@ui-elements'

describe('Snapshot test for the "UISeparator" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <ThemeProvider>
        <UISeparator />
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
