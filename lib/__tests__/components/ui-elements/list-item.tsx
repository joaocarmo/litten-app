import TestRenderer from 'react-test-renderer'
import ThemeProvider from '@components/theme/provider'
import { UIListItem } from '@ui-elements'

describe('Snapshot test for the "UIText" component', () => {
  it('renders correctly', () => {
    const element = TestRenderer.create(
      <ThemeProvider>
        <UIListItem badgeNum={2} hasExtra>
          Some text here
        </UIListItem>
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
