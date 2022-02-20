import { render } from '@utils/tests/react-native'
import { UISlider } from '@ui-elements'

describe('Snapshot test for the "UISlider" component', () => {
  it('renders correctly', () => {
    const element = render(
      <UISlider value={35} step={1} minimumValue={1} maximumValue={100} />,
    )

    expect(element.toJSON()).toMatchSnapshot()
  })
})
