/**
 * @format
 */

import { View, Text } from 'react-native'
import TestRenderer from 'react-test-renderer'
import TabNavigationItem from 'structure/tab-navigation-item'
import ThemeProvider from 'components/theme/provider'

const CustomComponent = (props) => <View />

describe('Snapshot test for the "TabNavigationItem" component', () => {
  it('renders correctly', () => {
    const props = {
      key: 'SCREEN_TAB_NAV_PROFILE',
      name: 'SCREEN_TAB_NAV_PROFILE',
      component: (
        <View>
          <Text>Hello there</Text>
        </View>
      ),
      options: {
        tabBarIcon: CustomComponent,
        tabBarAccessibilityLabel: 'accessibility.tabBar.profile',
      },
    }
    const element = TestRenderer.create(
      <ThemeProvider>
        <TabNavigationItem {...props} />
      </ThemeProvider>,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
