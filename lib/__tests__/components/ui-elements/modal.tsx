import TestRenderer from 'react-test-renderer'
import ThemeProvider from 'components/theme/provider'
import { UIModal, UIText } from 'ui-elements'
describe('Snapshot test for the "UIModal" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <ThemeProvider>
        <UIModal visible>
          <UIText>Some text here</UIText>
        </UIModal>
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
