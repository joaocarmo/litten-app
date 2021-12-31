import TestRenderer from 'react-test-renderer'
import ThemeProvider from 'components/theme/provider'
import { UIPrompt } from 'ui-elements'
beforeAll(() => {
  jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'android',
    select: () => null,
  }))
})
describe('Snapshot test for the "UIPrompt" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <ThemeProvider>
        <UIPrompt
          open
          title="Title"
          message="Message"
          type="secure-text"
          cancelLabel="Cancel"
          onCancel={() => undefined}
          confirmLabel="Confirm"
          onConfirm={() => undefined}
          isDestructive
        />
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
