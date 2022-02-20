import { render } from '@utils/tests/react-native'
import { UIPrompt } from '@ui-elements'

beforeAll(() => {
  jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'android',
    select: () => null,
  }))
})

describe('Snapshot test for the "UIPrompt" component', () => {
  it('renders correctly', () => {
    const element = render(
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
      />,
    )

    expect(element.toJSON()).toMatchSnapshot()
  })
})
