import { render } from '@utils/tests/react-native'
import { UIProgress } from '@ui-elements'

describe('Snapshot test for the "UIProgress" component', () => {
  it('renders correctly', () => {
    const currentStep = 2
    const totalSteps = 4
    const element = render(
      <UIProgress currentStep={currentStep} totalSteps={totalSteps} />,
    )

    expect(element.toJSON()).toMatchSnapshot()
  })
})
