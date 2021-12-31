import TestRenderer from 'react-test-renderer'
import ThemeProvider from 'components/theme/provider'
import { UILink } from 'ui-elements'
describe('Snapshot test for the "UILink" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <ThemeProvider>
        <UILink>Some text here</UILink>
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
