/**
 * @format
 */

import { UIProgress } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UIProgress" component', () => {
  it('renders correctly', () => {
    const currentStep = 2
    const totalSteps = 4
    const element = TestRenderer.create(
      <UIProgress currentStep={currentStep} totalSteps={totalSteps} />,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
