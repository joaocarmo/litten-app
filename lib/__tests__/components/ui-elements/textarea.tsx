import TestRenderer from 'react-test-renderer'
import ThemeProvider from 'components/theme/provider'
import { UITextArea } from 'ui-elements'
describe('Snapshot test for the "UITextArea" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <ThemeProvider>
        <UITextArea rows={4}>Some text here</UITextArea>
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
