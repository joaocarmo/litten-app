import React from 'react'
import { UITextArea } from 'ui-elements'
import renderer from 'react-test-renderer'

describe('Snapshot test for the "UITextArea" component', () => {
  it('renders correctly', () => {
    const element = renderer
      .create(<UITextArea rows={4}>Some text here</UITextArea>)
      .toJSON()
    expect(element).toMatchSnapshot()
  })
})
