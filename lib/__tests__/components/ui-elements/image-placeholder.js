/**
 * @format
 */

import { UIImagePlaceholder } from 'ui-elements'
import { iterateTimes } from 'utils/functions'
import TestRenderer from 'react-test-renderer'

const allowedNumPhotos = 8
const photos = []

describe('Snapshot test for the "UIImagePlaceholder" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
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
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
