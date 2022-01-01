import TestRenderer from 'react-test-renderer'
import ThemeProvider from '@components/theme/provider'
import { UIOption } from '@ui-elements'

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
  it('renders correctly without description', () => {
    const element = TestRenderer.create(
      <ThemeProvider>
        <UIOption
          items={items}
          label="Some text here"
          selectedValue={selectedValue}
        />
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
  it('renders correctly with description', () => {
    const element = TestRenderer.create(
      <ThemeProvider>
        <UIOption
          description="Some more text here"
          items={items}
          label="Some text here"
          selectedValue={selectedValue}
        />
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
