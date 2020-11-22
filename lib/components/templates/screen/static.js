/**
 * @format
 * @flow
 */

import { StyleSheet, View } from 'react-native'
import ScreenTabularNav from './tabular-nav'
import { screenTemplateStyles } from 'styles/common'

const StaticScreenTemplate: (args: any) => React$Node = ({
  children,
  header,
  tabs,
  style,
}) => (
  <View style={screenTemplateStyles.contentView}>
    <View style={screenTemplateStyles.header}>{header}</View>
    <View style={screenTemplateStyles.topBar} />
    {tabs && (
      <ScreenTabularNav tabs={tabs} style={screenTemplateStyles.tabBar} />
    )}
    <View
      style={[screenTemplateStyles.contentCommon, styles.contentStatic, style]}>
      {children}
    </View>
  </View>
)

const styles = StyleSheet.create({
  contentStatic: {
    flex: 1,
  },
})

export default StaticScreenTemplate
