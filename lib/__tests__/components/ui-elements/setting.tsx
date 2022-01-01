import TestRenderer from 'react-test-renderer'
import ThemeProvider from '@components/theme/provider'
import { UISetting, UIText } from '@ui-elements'

describe('Snapshot test for the "UISwitch" component', () => {
  it('renders correctly without description', () => {
    const element = TestRenderer.create(
      <ThemeProvider>
        <UISetting label="Some text here">
          <UIText>Some more text here</UIText>
        </UISetting>
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
  it('renders correctly with description', () => {
    const element = TestRenderer.create(
      <ThemeProvider>
        <UISetting description="Some description here" label="Some text here">
          <UIText>Some more text here</UIText>
        </UISetting>
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
