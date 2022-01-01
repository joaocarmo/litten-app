import TestRenderer from 'react-test-renderer'
import ThemeProvider from '@components/theme/provider'
import { UIButton } from '@ui-elements'

describe('Snapshot test for the "UIButton" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <ThemeProvider>
        <UIButton>Some text here</UIButton>
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
