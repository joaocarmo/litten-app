import { render } from '@utils/tests/react-native'
import UISelectPlatform from '@ui-elements/inner-components/select'
import UISelectPlatformAndroid from '@ui-elements/inner-components/select/select.android'
import UISelectPlatformIOS from '@ui-elements/inner-components/select/select.ios'
import { UISelect } from '@ui-elements'

jest.mock('@ui-elements/inner-components/select')

const mockUISelectPlatform = UISelectPlatform as jest.MockedFunction<
  typeof UISelectPlatform
>

const handleOnValueChange = jest.fn()

describe('Snapshot test for the "UISelect" component', () => {
  const platform = [
    ['ios', UISelectPlatformIOS],
    ['android', UISelectPlatformAndroid],
  ]

  describe.each(platform)('platform %s', (_, Component) => {
    beforeEach(() => {
      mockUISelectPlatform.mockImplementation((props) => (
        <Component {...props} />
      ))
    })

    it('renders correctly', () => {
      const items = [
        {
          key: 'one',
          label: 'One',
          value: 'one',
        },
        {
          key: 'two',
          label: 'Two',
          value: 'two',
        },
      ]
      const selectedValue = 'one'
      const element = render(
        <UISelect
          items={items}
          onValueChange={handleOnValueChange}
          placeholder="Some text here"
          selectedValue={selectedValue}
        />,
      )

      expect(element.toJSON()).toMatchSnapshot()
    })
  })
})
