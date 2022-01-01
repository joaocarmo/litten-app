import TestRenderer from 'react-test-renderer'
import ThemeProvider from '@components/theme/provider'
import { UISlider } from '@ui-elements'

describe('Snapshot test for the "UISlider" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <ThemeProvider>
        <UISlider value={35} step={1} minimumValue={1} maximumValue={100} />
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
