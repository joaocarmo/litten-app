import TestRenderer from 'react-test-renderer'
import ThemeProvider from '@components/theme/provider'
import { UIBalloon } from '@ui-elements'

describe('Snapshot test for the "UIBalloon" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <ThemeProvider>
        <UIBalloon type="info">Some text here</UIBalloon>
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
