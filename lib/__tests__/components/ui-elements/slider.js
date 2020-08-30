import React from 'react'
import { UISlider } from 'ui-elements'
import renderer from 'react-test-renderer'

describe('Snapshot test for the "UISlider" component', () => {
  it('renders correctly', () => {
    const element = renderer
      .create(
        <UISlider value={35} step={1} minimumValue={1} maximumValue={100} />,
      )
      .toJSON()
    expect(element).toMatchSnapshot()
  })
})
