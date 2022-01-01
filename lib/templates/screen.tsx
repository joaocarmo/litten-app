import type { FC } from 'react'
import { SafeAreaView, StatusBar, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@hooks'
import ScreenTabular from '@templates/screen/tabular'
import ScrollableScreenTemplate from '@templates/screen/scrollable'
import StaticScreenTemplate from '@templates/screen/static'

const ScreenTemplate = ({
  children,
  header,
  scrollable = false,
  tabs = null,
  ...otherProps
}) => {
  const insets = useSafeAreaInsets()
  const {
    createStyles,
    theme: { colors },
  } = useTheme()
  const styles = createStyles((theme) => ({
    safeAreaViewContainer: {
      flex: 1,
      backgroundColor: theme.colors.secondary,
    },
    safeAreaView: {
      flex: 1,
    },
    offArea: {
      backgroundColor: theme.colors.neutralLight,
    },
  }))

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
      const TabScreenComponent =
        scrollableTab && InnerComponent
          ? ScrollableScreenTemplate
          : StaticScreenTemplate

      const CompoundComponent: () => FC = () => (
        <TabScreenComponent header={header} tabs={tabs}>
          <InnerComponent />
        </TabScreenComponent>
      )

      // eslint-disable-next-line no-param-reassign
      arr[idx].compoundComponent = CompoundComponent
    })

    screenContent = <ScreenTabular tabs={tabs} />
  }

  return (
    <View style={styles.safeAreaViewContainer}>
      <StatusBar barStyle="light-content" backgroundColor={colors.secondary} />
      <SafeAreaView style={styles.safeAreaView}>{screenContent}</SafeAreaView>
      <View
        style={[
          styles.offArea,
          {
            height: insets.bottom,
          },
        ]}
      />
    </View>
  )
}

export default ScreenTemplate
