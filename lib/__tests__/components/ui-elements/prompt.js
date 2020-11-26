/**
 * @format
 */

import { UIPrompt } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

beforeAll(() => {
  jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'android',
    select: () => null,
  }))
})

describe('Snapshot test for the "UIPrompt" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
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
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
