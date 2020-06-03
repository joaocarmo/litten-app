import React from 'react'
import { UIImagePlaceholder } from 'ui-elements'
import { iterateTimes } from 'utils/functions'
import renderer from 'react-test-renderer'

const allowedNumPhotos = 8
const photos = []

describe('Snapshot test for the "UIImagePlaceholder" component', () => {
  it('renders correctly', () => {
    const element = renderer
      .create(
        <UIImagePlaceholder.Group>
          {iterateTimes(allowedNumPhotos).map((v, idx) =>
            photos[idx] ? (
              <UIImagePlaceholder.ImageItem key={idx} source={photos[idx]} />
            ) : (
              <UIImagePlaceholder.Item
                key={idx}
                actionable={idx === photos.length}
              />
            ),
          )}
        </UIImagePlaceholder.Group>,
      )
      .toJSON()
    expect(element).toMatchSnapshot()
  })
})
