import TestRenderer from 'react-test-renderer'
import ThemeProvider from 'components/theme/provider'
import { UISelect } from 'ui-elements'
describe('Snapshot test for the "UISelect" component', () => {
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
    const element = TestRenderer.create(
      <ThemeProvider>
        <UISelect
          placeholder="Some text here"
          items={items}
          selectedValue={selectedValue}
        />
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
