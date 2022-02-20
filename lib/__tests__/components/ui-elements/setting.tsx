import { render } from '@utils/tests/react-native'
import { UISetting, UIText } from '@ui-elements'

describe('Snapshot test for the "UISwitch" component', () => {
  it('renders correctly without description', () => {
    const element = render(
      <UISetting label="Some text here">
        <UIText>Some more text here</UIText>
      </UISetting>,
    )

    expect(element.toJSON()).toMatchSnapshot()
  })

  it('renders correctly with description', () => {
    const element = render(
      <UISetting description="Some description here" label="Some text here">
        <UIText>Some more text here</UIText>
      </UISetting>,
    )

    expect(element.toJSON()).toMatchSnapshot()
  })
})
