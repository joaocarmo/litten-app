import React from 'react'
import { UIProgress } from 'ui-elements'
import renderer from 'react-test-renderer'

describe('Snapshot test for the "UIProgress" component', () => {
  it('renders correctly', () => {
    const currentStep = 2
    const totalSteps = 4
    const element = renderer
      .create(<UIProgress currentStep={currentStep} totalSteps={totalSteps} />)
      .toJSON()
    expect(element).toMatchSnapshot()
  })
})
