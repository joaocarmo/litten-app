import { render } from '@utils/tests/react-native'
import UISelectPlatform from '@ui-elements/inner-components/select'
import UISelectPlatformAndroid from '@ui-elements/inner-components/select/select.android'
import UISelectPlatformIOS from '@ui-elements/inner-components/select/select.ios'
import { UIOption } from '@ui-elements'

jest.mock('@ui-elements/inner-components/select')

const mockUISelectPlatform = UISelectPlatform as jest.MockedFunction<
  typeof UISelectPlatform
>

describe('Snapshot test for the "UISwitch" component', () => {
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

    it('renders correctly without description', () => {
      const element = render(
        <UIOption
          items={items}
          label="Some text here"
          selectedValue={selectedValue}
        />,
      )

      expect(element.toJSON()).toMatchSnapshot()
    })

    it('renders correctly with description', () => {
      const element = render(
        <UIOption
          description="Some more text here"
          items={items}
          label="Some text here"
          selectedValue={selectedValue}
        />,
      )

      expect(element.toJSON()).toMatchSnapshot()
    })
  })
})
