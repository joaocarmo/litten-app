import { render } from '@utils/tests/react-native'
import UIPromptAndroid from '@ui-elements/prompt/prompt.android'

describe('Snapshot test for the "UIPrompt" component [android]', () => {
  it('renders correctly [android]', () => {
    const element = render(
      <UIPromptAndroid
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
