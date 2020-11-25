/**
 * @format
 * @flow
 */

import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ScreenTabular from './screen/tabular'
import ScrollableScreenTemplate from './screen/scrollable'
import StaticScreenTemplate from './screen/static'
import colors from 'styles/colors'

const ScreenTemplate: (args: any) => React$Node = ({
  children,
  header,
  scrollable = false,
  tabs = null,
  ...otherProps
}) => {
  const insets = useSafeAreaInsets()

  const ScreenComponent =
    scrollable && children ? ScrollableScreenTemplate : StaticScreenTemplate
  let screenContent = (
    <ScreenComponent header={header} {...otherProps}>
      {children}
    </ScreenComponent>
  )

  if (Array.isArray(tabs) && tabs.length) {
    tabs.forEach((tab, idx, arr) => {
      const { component: InnerComponent, scrollable: scrollableTab } = tab

      let TabScreenComponent =
        scrollableTab && InnerComponent
          ? ScrollableScreenTemplate
          : StaticScreenTemplate

      const CompoundComponent: () => React$Node = () => (
        <TabScreenComponent header={header} tabs={tabs}>
          <InnerComponent />
        </TabScreenComponent>
      )

      arr[idx].compoundComponent = CompoundComponent
    })

    screenContent = <ScreenTabular tabs={tabs} />
  }

  return (
    <View style={styles.safeAreaViewContainer}>
      <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
      <SafeAreaView style={styles.safeAreaView}>{screenContent}</SafeAreaView>
      <View style={[styles.offArea, { height: insets.bottom }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  safeAreaView: {
    flex: 1,
  },
  offArea: {
    backgroundColor: colors.lightGray,
  },
})

export default ScreenTemplate
