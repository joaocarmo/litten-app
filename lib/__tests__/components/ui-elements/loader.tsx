import TestRenderer from 'react-test-renderer'
import ThemeProvider from 'components/theme/provider'
import { UILoader } from 'ui-elements'
describe('Snapshot test for the "UILoader" component', () => {
  it('renders null when inactive', () => {
    const element = TestRenderer.create(
      <ThemeProvider>
        <UILoader active={false} />
      </ThemeProvider>,
    ).toJSON()
    expect(element).toBeNull()
  })
  it('renders correctly when active', () => {
    const element = TestRenderer.create(
      <ThemeProvider>
        <UILoader active />
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
