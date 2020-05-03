import React from 'react'
import { UIListItem } from 'ui-elements'
import renderer from 'react-test-renderer'

describe('Snapshot test for the "UIText" component', () => {
  it('renders correctly', () => {
    const element = renderer
      .create(
        <UIListItem badgeNum={2} hasExtra>
          Some text here
        </UIListItem>,
      )
      .toJSON()
    expect(element).toMatchSnapshot()
  })
})
