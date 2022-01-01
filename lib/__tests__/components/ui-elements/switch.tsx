import TestRenderer from 'react-test-renderer'
import ThemeProvider from '@components/theme/provider'
import { UISwitch } from '@ui-elements'

describe('Snapshot test for the "UISwitch" component', () => {
  it('renders correctly without description', () => {
    const element = TestRenderer.create(
      <ThemeProvider>
        <UISwitch label="Some text here" value={true} />
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
  it('renders correctly with description', () => {
    const element = TestRenderer.create(
      <ThemeProvider>
        <UISwitch
          description="Some more text here"
          label="Some text here"
          value={true}
        />
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
