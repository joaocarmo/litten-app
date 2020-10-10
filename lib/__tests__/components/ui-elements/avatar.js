import React from 'react'
import { UIAvatar } from 'ui-elements'
import renderer from 'react-test-renderer'

const imgPlaceholder = 'https://placeimg.com/140/140/people'

describe('Snapshot test for the "UIText" component', () => {
  it('renders correctly', () => {
    const element = renderer
      .create(<UIAvatar source={{ uri: imgPlaceholder }} />)
      .toJSON()
    expect(element).toMatchSnapshot()
  })
})
