import React from 'react'
import { UIIcon } from 'ui-elements'
import renderer from 'react-test-renderer'

describe('Snapshot test for the "UIText" component', () => {
  it('renders correctly', () => {
    const element = renderer
      .create(<UIIcon icon={{ uri: '' }} elevated circle />)
      .toJSON()
    expect(element).toMatchSnapshot()
  })
})
