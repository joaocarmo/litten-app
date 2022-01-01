import TestRenderer from 'react-test-renderer'
import ThemeProvider from '@components/theme/provider'
import { UIHeader } from '@ui-elements'

describe('Snapshot test for the "UIHeader" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <ThemeProvider>
        <UIHeader>Some text here</UIHeader>
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
