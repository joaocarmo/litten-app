/**
 * @format
 * @flow
 */

import { ScrollView, StyleSheet, View } from 'react-native'
import ScreenTabularNav from './tabular-nav'
import {
  STRUCTURE_TAB_NAV_HEIGHT,
  STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
} from 'utils/constants'
import { screenTemplateStyles } from 'styles/common'

const ScrollableScreenTemplate: (args: any) => React$Node = ({
  children,
  header,
  tabs,
}) => (
  <ScrollView
    bounces={false}
    contentContainerStyle={styles.contentContainerStyle}>
    <View style={screenTemplateStyles.contentView}>
      <View style={screenTemplateStyles.header}>{header}</View>
      <View style={screenTemplateStyles.topBar} />
      {tabs && (
        <ScreenTabularNav tabs={tabs} style={screenTemplateStyles.tabBar} />
      )}
      <View style={[screenTemplateStyles.contentCommon, styles.contentIn]}>
        {children}
      </View>
    </View>
  </ScrollView>
)

const styles = StyleSheet.create({
  contentContainerStyle: {
    borderTopLeftRadius: STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
    borderTopRightRadius: STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
  },
  contentIn: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT * 1.5,
  },
})

export default ScrollableScreenTemplate
