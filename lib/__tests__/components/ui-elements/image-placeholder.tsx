/* eslint-disable react/no-array-index-key */
import { render } from '@utils/tests/react-native'
import { UIImagePlaceholder } from '@ui-elements'
import { iterateTimes } from '@utils/functions'

const allowedNumPhotos = 8
const photos = []
const handleOnPress = jest.fn()

describe('Snapshot test for the "UIImagePlaceholder" component', () => {
  it('renders correctly', () => {
    const element = render(
      <UIImagePlaceholder.Group>
        {iterateTimes(allowedNumPhotos).map((v, idx) =>
          photos[idx] ? (
            <UIImagePlaceholder.ImageItem
              key={idx}
              source={photos[idx]}
              onPress={handleOnPress}
            />
          ) : (
            <UIImagePlaceholder.Item
              key={idx}
              actionable={idx === photos.length}
            />
          ),
        )}
      </UIImagePlaceholder.Group>,
    )

    expect(element.toJSON()).toMatchSnapshot()
  })
})
