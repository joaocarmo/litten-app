import { render } from '@utils/tests/react-native'
import { UISwitch } from '@ui-elements'

describe('Snapshot test for the "UISwitch" component', () => {
  it('renders correctly without description', () => {
    const element = render(<UISwitch label="Some text here" value={true} />)

    expect(element.toJSON()).toMatchSnapshot()
  })

  it('renders correctly with description', () => {
    const element = render(
      <UISwitch
        description="Some more text here"
        label="Some text here"
        value={true}
      />,
    )

    expect(element.toJSON()).toMatchSnapshot()
  })
})
