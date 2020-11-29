/**
 * @format
 */

import { View, Text } from 'react-native'
import TabNavigationItem from 'structure/tab-navigation-item'
import TestRenderer from 'react-test-renderer'

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
      <TabNavigationItem {...props} />,
    ).toJSON()
    expect(element).toMatchSnapshot()
  })
})
