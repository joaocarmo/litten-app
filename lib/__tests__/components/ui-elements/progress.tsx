import TestRenderer from 'react-test-renderer'
import ThemeProvider from 'components/theme/provider'
import { UIProgress } from 'ui-elements'
describe('Snapshot test for the "UIProgress" component', () => {
  it('renders correctly', () => {
    const currentStep = 2
    const totalSteps = 4
    const element = TestRenderer.create(
      <ThemeProvider>
        <UIProgress currentStep={currentStep} totalSteps={totalSteps} />
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
