import { StyleSheet, View } from 'react-native'
import type { ViewProps } from 'react-native'
import { useTheme } from '@hooks'
import ScreenTabularNav from '@templates/screen/tabular-nav'
import type { Tab } from '@templates/types'

export type StaticScreenTemplateProps = {
  children: ViewProps['children']
  header?: ViewProps['children']
  tabs?: Tab[]
  style?: ViewProps['style']
}

const StaticScreenTemplate = ({
  children,
  header,
  tabs,
  style,
}: StaticScreenTemplateProps) => {
  const {
    commonStyles: { screenTemplateStyles },
  } = useTheme()

  return (
    <View style={screenTemplateStyles.contentView}>
      <View style={screenTemplateStyles.header}>{header}</View>
      <View style={screenTemplateStyles.topBar} />
      {tabs && (
        <ScreenTabularNav tabs={tabs} style={screenTemplateStyles.tabBar} />
      )}
      <View
        style={[
          screenTemplateStyles.contentCommon,
          styles.contentStatic,
          style,
        ]}
      >
        {children}
      </View>
    </View>
  )
}

StaticScreenTemplate.defaultProps = {
  header: null,
  style: undefined,
  tabs: undefined,
}

const styles = StyleSheet.create({
  contentStatic: {
    flex: 1,
  },
})

export default StaticScreenTemplate
